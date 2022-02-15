import { IUser, UserRole } from './../interfaces/user.interface';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema<IUser> ({
  login: String,
  password: String,
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: UserRole.USER
  }
})
