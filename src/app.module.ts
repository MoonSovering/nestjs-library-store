import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { BookListModule } from './book-list/book-list.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [ EnvConfiguration ]
    }),
    BookListModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: process.env.DB_NAME
    }),
    CloudinaryModule,
    CommonModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}