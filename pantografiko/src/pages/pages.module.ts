import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { PagesSchema } from 'src/schemas/pages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'pages',
      schema: PagesSchema
    }])
  ],
  controllers: [PagesController],
  providers: [PagesService]
})
export class PagesModule {}
