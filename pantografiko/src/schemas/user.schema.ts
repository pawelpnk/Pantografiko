import { IUser, UserRole } from './../interfaces/user.interface';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema<IUser> ({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: UserRole.USER
  }
})
