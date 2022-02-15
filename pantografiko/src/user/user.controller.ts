import { loginUser } from './../dto/loginUser.dto';
// import { IUser } from './../interfaces/user.interface';
import { Body, Controller, Get, HttpStatus, Post, Res, Param, NotFoundException, HttpException, UseGuards, HttpCode } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

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
      const jwt: string = await this.userService.login(bodyLogin);
      return res.status(HttpStatus.OK).json({
        accessToken: jwt,
        token_type: 'JWT',
        expires_in: process.env.EXPIRESIN
      })
    } catch {
      // throw new HttpException('Failed credentials', HttpStatus.NOT_FOUND);
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
    @Param('user') id
  ) {
    const user = await this.userService.findOne(id);
    return user;
  }
}
