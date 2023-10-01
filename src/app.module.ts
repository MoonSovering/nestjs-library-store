import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookListModule } from './book-list/book-list.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    BookListModule,
    MongooseModule.forRoot('mongodb://localhost:27017/book-store'),
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 