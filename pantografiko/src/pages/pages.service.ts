import { CreatePagesDTO } from './../dto/create-pages.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pages } from '../interfaces/pages.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class PagesService {
  constructor(@InjectModel('pages') private pagesModel: Model<Pages>) {}

  async addInspection(createInspectionDTO: CreatePagesDTO, user: IUser): Promise<Pages> {
    const findInspection = await this.pagesModel.find({locomotiveNumber: createInspectionDTO.locomotiveNumber}).sort({inspectionOfNumber: -1}).limit(1);

    const checkInspection: number = findInspection.length > 0 ? (!findInspection[0].inspectionOfNumber ? 1 : ++findInspection[0].inspectionOfNumber) : 1;

    const newInspection = new this.pagesModel(createInspectionDTO);
    newInspection.loginUserID = user.login;
    newInspection.inspectionOfNumber = checkInspection;
    return newInspection.save()
  }

  async getInspections(): Promise<Pages[]> {
    const fetchAllInspection = await this.pagesModel.find().exec();
    return fetchAllInspection;
  }

  async findInspection(id: string): Promise<Pages[]> {
    const fetchOneInspection = await this.pagesModel.find({_id: id}).exec();
    return fetchOneInspection;
  }

  async deleteInspection(inspectionID: string, user: IUser): Promise<any> {
    const findInspection = await this.findInspection(inspectionID);
    if(user.role === 'admin' || user.role === 'editor' || user.login === findInspection[0].loginUserID) {
      const findInspectionAndDelete = await this.pagesModel.findByIdAndDelete({_id: inspectionID});
      return findInspectionAndDelete;
    }    
  }

  async updateInspection(inspectionID: string, createInspectionDTO: CreatePagesDTO, user: IUser): Promise<Pages> {
    const findInspection = await this.findInspection(inspectionID);
    if(user.role === 'admin' || user.role === 'editor' || user.login === findInspection[0].loginUserID) {
      const findInspectionAndUpdate = await this.pagesModel.findByIdAndUpdate({_id: inspectionID}, createInspectionDTO);
      return findInspectionAndUpdate;
    }
  }
}
