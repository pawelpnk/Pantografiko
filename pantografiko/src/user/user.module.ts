import { JwtStrategy } from './../auth/jwt.strategy';
import { UserSchema } from './../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'user',
      schema: UserSchema
    }]),
    forwardRef(()=>AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [
    UserService
  ]
})
export class UserModule {}
