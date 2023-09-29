import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookListService } from './book-list.service';
import { BookListController } from './book-list.controller';
import { BookList, BookSchema } from './entities/book-list.entity';

@Module({
  controllers: [BookListController],
  providers: [BookListService],
  imports: [
    MongooseModule.forFeature([{
    name: BookList.name,
    schema: BookSchema
  }]),
  
]
})
export class BookListModule {}
