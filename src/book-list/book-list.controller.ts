import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookListService } from './book-list.service';
import { CreateBookListDto } from './dto/create-book-list.dto';
import { UpdateBookListDto } from './dto/update-book-list.dto';

@Controller('booklist')
export class BookListController {
  constructor(private readonly bookListService: BookListService) {}

  @Post()
  create(@Body() createBookListDto: CreateBookListDto) {
    return this.bookListService.create(createBookListDto);
  }

  @Get()
  findAll() {
    return this.bookListService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.bookListService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateBookListDto: UpdateBookListDto) {
    return this.bookListService.update(term, updateBookListDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.bookListService.remove(term);
  }
}
