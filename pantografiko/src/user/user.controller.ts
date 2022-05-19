import { loginUser } from './../dto/loginUser.dto';
import { Body, Controller, Get, HttpStatus, Post, Res, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { changePassword } from '../dto/changePassword';
import { userResponseLogin } from '../dto/userResponseLogin.dto';
import { UserResponse } from '../dto/userResponse.dto';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async createUser(
    @Res() res: Response,
    @Body() newUser: CreateUserDTO
  ) {
    try {
      const user: UserResponse = await this.userService.createUser(newUser);
      return res.status(HttpStatus.OK).json({
        message: 'Dodano nowego użytkownika',
        user
      })
    } catch (err) {
      return res.json({
        message: err.message 
      });
    }
  }

  @Post('/login')
  async loginUser(
    @Body() bodyLogin: loginUser,
    @Res() res: Response
  ) {
    try {
      const userReturn: userResponseLogin = await this.userService.login(bodyLogin);
      return res.status(HttpStatus.OK).json({
        accessToken: userReturn.generateJWT,
        findUser: userReturn.findUser,
        findUserID: userReturn.findUserID
      })
    } catch (err) {
      return res.status(400).json({
        message: err.message
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:user')
  async getOneUser(
    @Param('user') id: string
  ): Promise<UserResponse> {
    const user: UserResponse = await this.userService.findOne(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/password')
  async changePassword(
    @Body() body: changePassword,
    @Res() res: Response
  ) {
    try {
      await this.userService.setNewPassword(body);
      return res.status(HttpStatus.OK).json({
        message: "Hasło zmienione"
      })
    } catch (err) {
      return res.json({ message: err.message})
    }   
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users/:login')
  async deleteUser(
    @Param('login') login: string
  ) {
    const deletedUser = await this.userService.deleteUser(login);
    return deletedUser;
  }
}
