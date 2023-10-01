import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BookListService } from './book-list.service';
import { CreateBookListDto } from './dto/create-book-list.dto';
import { UpdateBookListDto } from './dto/update-book-list.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
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
  findAllBooks() {
    return this.bookListService.findAllBooks();
  }

  @Get(':term')
  findBookById(@Param('term', ParseMongoIdPipe) term: string) {
    return this.bookListService.findBookById(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateBookListDto: UpdateBookListDto) {
    return this.bookListService.update(term, updateBookListDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.bookListService.removeBook(id);
  }
}
