import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BookListService } from './book-list.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateBookListDto, UpdateBookListDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('booklist')
export class BookListController {
  constructor(
    private readonly bookListService: BookListService,
    private readonly cloudinaryService: CloudinaryService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createBook(
    @Body()  createBookListDto: CreateBookListDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' })
        ]
      })
    ) file: Express.Multer.File
    ) {

      const { secure_url } = await this.cloudinaryService.uploadFile(file);
      createBookListDto.image = secure_url;

      return this.bookListService.create(createBookListDto);
  }

  @Get()
  findAllBooks( @Query() paginationDto: PaginationDto ) {

    return this.bookListService.findAllBooks(paginationDto);
  }

  @Get(':term')
  findBookById(@Param('term', ParseMongoIdPipe) term: string) {
    return this.bookListService.findBookById(term);
  }

  @Patch(':term')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(
    @Param('term', ParseMongoIdPipe) term: string,
    @Body() updateBookListDto: UpdateBookListDto,
    @UploadedFile( new ParseFilePipe({ validators: [
      new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' })
    ] }) ) file: Express.Multer.File
    ) {
      
      const { secure_url } = await this.cloudinaryService.uploadFile(file);
      updateBookListDto.image = secure_url;

    return this.bookListService.updateBook(term, updateBookListDto);
  }

  @Delete(':id')
  removeBook(@Param('id', ParseMongoIdPipe) id: string) {
    return this.bookListService.removeBook(id);
  }
}
