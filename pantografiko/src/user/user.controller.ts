import { loginUser } from './../dto/loginUser.dto';
import { Body, Controller, Get, HttpStatus, Post, Res, Param, NotFoundException, HttpException, UseGuards, HttpCode, Patch } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { changePassword } from 'src/dto/changePassword';
import { userResponseLogin } from 'src/dto/userResponseLogin.dto';

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
      const user = await this.userService.createUser(newUser);
      return res.status(HttpStatus.OK).json({
        message: 'Added new user',
        user
      })
    } catch {
      throw new NotFoundException('Failed to add a user');
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
    } catch {
      return res.status(400).json({
        message: 'Failed credentials'
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:user')
  async getOneUser(
    @Param('user') id: string
  ) {
    const user = await this.userService.findOne(id);
    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/users/loginUser')
  // async fetchOneUser(
  //   @Body() login: string
  // ) {
  //   const user = await this.userService.findOneWithLogin(login);
  //   return user;
  // }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/password')
  async changePassword(
    @Body() body: changePassword
  ) {
    const newPassword = await this.userService.setNewPassword(body);
    if(newPassword){
      return 'Password changed';
    }    
  }
}
