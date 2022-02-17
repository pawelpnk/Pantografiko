import { loginUser } from './../dto/loginUser.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJWT(user: loginUser): Promise<string> {
    return this.jwtService.signAsync({user});
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  async comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }
}
