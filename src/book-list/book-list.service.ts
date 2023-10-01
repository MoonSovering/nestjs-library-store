import { Model } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBookListDto } from './dto/create-book-list.dto';
import { UpdateBookListDto } from './dto/update-book-list.dto';
import { BookList } from './entities/book-list.entity';

@Injectable()
export class BookListService {

  constructor(
    @InjectModel(BookList.name) private bookModel: Model<BookList>
  ){}

  async create(createBookListDto: CreateBookListDto) {

    try {
      const bookData = await this.bookModel.create(createBookListDto);

      return bookData;
    } catch (error) {
      
      if(error.code === 11000) throw new BadRequestException(`Register already exist in DB ${ JSON.stringify( error.keyValue ) }`)

      console.log(error);
      throw new InternalServerErrorException(`Can created a book - check server logs`)
    }

  }

  async findAllBooks() {

    const books = await this.bookModel.find()

    return books;
  }

  async findBookById(term: string) {

    const book = await this.bookModel.findById(term);

    if(!book) throw new BadRequestException(`Author or book ${ term } can't be found`);
    

    return book;
  }

  update(term: string, updateBookListDto: UpdateBookListDto) {
    return `This action updates a #${term} bookList`;
  }

  async removeBook(id: string) {

    // const result = await this.bookModel.findByIdAndDelete( id );

    const { deletedCount } = await this.bookModel.deleteOne({ _id: id });

    if( deletedCount === 0 ) throw new BadRequestException(`Book with ID ${id} can't be found`)


    return 'Book have been delete succesfully';
  }
}
