import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookListModule } from './book-list/book-list.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    BookListModule,
    MongooseModule.forRoot('mongodb://localhost:27017/book-store'),
    UploadModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}