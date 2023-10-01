import { Model } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBookListDto } from './dto/create-book-list.dto';
import { UpdateBookListDto } from './dto/update-book-list.dto';
import { BookList } from './entities/book-list.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async findAllBooks( paginationDto: PaginationDto) {

    const { limit = 10, offset= 0 } = paginationDto;

    const books = await this.bookModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');

    if(books.length === 0) throw new BadRequestException(`Book list its empty, please insert one book if you want to see the list`);

    return books;
  }

  async findBookById(term: string) {

    const book = await this.bookModel.findById(term);

    if(!book) throw new BadRequestException(`Author or book ${ term } can't be found`);
    

    return book;
  }

  async updateBook(term: string, updateBookListDto: UpdateBookListDto) {

    const newBook = await this.bookModel.findByIdAndUpdate(
      term, 
      updateBookListDto,
      {new: true}
      );

    if(!newBook) throw new BadRequestException(`Book with ID ${term} not found`);

    return newBook;
  }

  async removeBook(id: string) {

    const { deletedCount } = await this.bookModel.deleteOne({ _id: id });

    if( deletedCount === 0 ) throw new BadRequestException(`Book with ID ${id} can't be found`)


    return 'Book have been delete succesfully';
  }
}
