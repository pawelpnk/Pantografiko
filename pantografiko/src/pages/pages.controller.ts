import { JwtAuthGuard } from '../auth/jwt.guard';
import { PagesService } from './pages.service';
import { Body, Controller, HttpStatus, Post, Res, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreatePagesDTO } from '../dto/create-pages.dto';
import { UserObj } from '../decorators/user.decorator';
import { IUser } from '../interfaces/user.interface';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addInspection(
    @Res() res: Response,
    @Body() createInspectionDTO: CreatePagesDTO,
    @UserObj() user: IUser
  ) {
    const newInspection = await this.pagesService.addInspection(createInspectionDTO, user);
    return res.status(HttpStatus.OK).json({
      message: 'Dodano nową inspekcje',
      inspection: newInspection
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch')
  async fetchAllInspections(
    @Res() res: Response
  ) {
    const fetchInspections = await this.pagesService.getInspections();
    return res.status(HttpStatus.OK).json(fetchInspections)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch/:id')
  async fetchOneInspection(
    @Res() res: Response,
    @Param('id') ID: string
  ) {
    const searchOneInspection = await this.pagesService.findInspection(ID);
    return res.status(HttpStatus.OK).json({
      message: 'Inspekcja pobrana',
      inspection: searchOneInspection
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteInspection(
    @Res() res: Response,
    @Param('id') ID: string
  ) {
    const deletedInspection = await this.pagesService.deleteInspection(ID);
    return res.status(HttpStatus.OK).json({
      message: 'Inspekcja usunięta',
      inspection: deletedInspection
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async updateinspection(
    @Res() res: Response,
    @Param('id') ID: string,
    @Body() inspectionDTO: CreatePagesDTO
  ) {
    const updateInspection = await this.pagesService.updateInspection(ID, inspectionDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Inspekcja zaaktualizowana',
      inspection: updateInspection
    })
  }
}
