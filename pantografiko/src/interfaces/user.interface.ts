import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  login?: string;
  password?: string;
  email?: string;
  role?: string;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ADMIN_COMPANY = 'admin_company',
  EDITOR_COMPANY = 'editor_company'
}

