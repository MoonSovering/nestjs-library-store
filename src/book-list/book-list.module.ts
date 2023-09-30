import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookListService } from './book-list.service';
import { BookListController } from './book-list.controller';
import { BookList, BookSchema } from './entities/book-list.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [BookListController],
  providers: [BookListService],
  imports: [
    MongooseModule.forFeature([{
    name: BookList.name,
    schema: BookSchema
  }]),
  CloudinaryModule
]
})
export class BookListModule {}
