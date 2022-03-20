import { loginUser } from './../dto/loginUser.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserResponse } from './../dto/userResponse.dto';
import { IUser, UserRole } from './../interfaces/user.interface';
import { HttpException, Injectable, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { changePassword } from 'src/dto/changePassword';
import { userResponseLogin } from 'src/dto/userResponseLogin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<IUser>,
    @Inject(forwardRef(()=> AuthService))private authService: AuthService
  ) {}

  filter(user: CreateUserDTO): UserResponse {
    const { login, email, role } = user;
    return { login, email, role };
  }

  async createUser(user: CreateUserDTO): Promise<UserResponse> {
    
      const checkLogin: boolean = await this.findByLogin(user.login) ? true : false;
      const checkEmail: boolean = await this.findByEmail(user.email.toLowerCase()) ? true : false;

      if(checkLogin || checkEmail) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const hashPasswordNewUser: string = await this.authService.hashPassword(user.password);
      const newUser: CreateUserDTO = new CreateUserDTO();
      newUser.login = user.login;
      newUser.password = hashPasswordNewUser;
      newUser.email = user.email;
      newUser.role = UserRole.USER;

      const newUserSave = await new this.userModel(newUser).save();

      return this.filter(newUserSave);
  }

  async findOne(id: string): Promise<UserResponse> {
    const findUser = await this.userModel.findOne({_id: id}).exec();
    return this.filter(findUser);
  }

  async findAll(): Promise<UserResponse[]> {
    const findUsers = await this.userModel.find().exec();
    const returnUsersWithoutPassword = findUsers.map((user) => {
      return this.filter(user);
    })

    return returnUsersWithoutPassword;
  }

  async updateUser(id: any, user: CreateUserDTO): Promise<UserResponse> {
    const updateUser = await this.userModel.findByIdAndUpdate({_id: id}, user);
    return this.filter(updateUser);
  }

  async deleteUser(login: string): Promise<UserResponse> {
    const deletedUser = await this.userModel.findOneAndDelete({login});
    return this.filter(deletedUser);
  }

  async login(user: loginUser): Promise<userResponseLogin> {
    const validateUser = await this.validateUser(user.login, user.password);
    if(validateUser) {
      const findUserData = await this.findByLogin(user.login);
      const findUser = this.filter(findUserData);
      const findUserID = await this.findID(user.login);
      const generateJWT = await this.authService.generateJWT(user);

      const responseLogin = {
        generateJWT,
        findUser,
        findUserID
      }

      return responseLogin;
    } else {
      throw new HttpException('Wrong credentials!', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateUser(login: string, password: string): Promise<UserResponse> {
    const findUser = await this.findByLogin(login);
    if(!findUser) {
      throw new HttpException('Invalid credentials!', HttpStatus.NOT_FOUND);
    }
    const validate: boolean = await this.authService.comparePasswords(password, findUser.password);
    if(validate) {
      return this.filter(findUser);
      // return findUser;
    } else {
      throw new HttpException('Bad login or password', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByLogin(login: string): Promise<IUser> {
    const findUserByLogin = await this.userModel.findOne({login});
    
    return findUserByLogin;
  }

  async findByEmail(email: string): Promise<IUser> {
    const findUserByEmail = await this.userModel.findOne({email});
    return findUserByEmail;
  }

  async findID(login:string): Promise<string> {
    const findID = await this.userModel.findOne({login});
    const { _id: id } = findID;
    return id;
  }

  async setNewPassword(body: changePassword): Promise<UserResponse | string>{
    const findUserWithOldPassword: UserResponse = await this.validateUser(body.login, body.password);
    const findUserID: string = await this.findID(body.login);
    if(findUserWithOldPassword){
      const hashPassword: string = await this.authService.hashPassword(body.newPassword);
      const changePasswordUser = await this.userModel.findByIdAndUpdate({_id: findUserID}, {password: hashPassword});
      return this.filter(changePasswordUser);
    } else {
      return 'Wrong password'
    }
  }

}
