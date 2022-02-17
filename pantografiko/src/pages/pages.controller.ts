import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PagesService } from './pages.service';
import { Body, Controller, HttpStatus, Post, Res, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreatePagesDTO } from 'src/dto/create-pages.dto';
import { UserObj } from 'src/decorators/user.decorator';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addInspection(
    @Res() res: Response,
    @Body() createInspectionDTO: CreatePagesDTO,
    @UserObj() user
  ): Promise<Object> {
    const newInspection = await this.pagesService.addInspection(createInspectionDTO, user);
    return res.status(HttpStatus.OK).json({
      message: 'New inspection has been succesfully added',
      inspection: newInspection
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch')
  async fetchAllInspections(
    @Res() res: Response
  ): Promise<Object> {
    const fetchInspections = await this.pagesService.getInspections();
    return res.status(HttpStatus.OK).json(fetchInspections)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch/:id')
  async fetchOneInspection(
    @Res() res: Response,
    @Param('id') ID: string
  ): Promise<Object> {
    const searchOneInspection = await this.pagesService.findInspection(ID);
    return res.status(HttpStatus.OK).json({
      message: 'Inspection download',
      inspection: searchOneInspection
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteInspection(
    @Res() res: Response,
    @Param('id') ID: string
  ): Promise<Object> {
    const deletedInspection = await this.pagesService.deleteInspection(ID);
    return res.status(HttpStatus.OK).json({
      message: 'Inspection deleted',
      inspection: deletedInspection
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async updateinspection(
    @Res() res: Response,
    @Param('id') ID: string,
    @Body() inspectionDTO: CreatePagesDTO
  ): Promise<Object> {
    const updateInspection = await this.pagesService.updateInspection(ID, inspectionDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Inspection has been succesfully updated',
      inspection: updateInspection
    })
  }
}
