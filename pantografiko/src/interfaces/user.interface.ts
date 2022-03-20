import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  login?: string;
  password?: string;
  email?: string;
  role?: string;
}

export enum UserRole {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

