import { Controller, UseInterceptors, Post, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile( @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10000000}),
        new FileTypeValidator({ fileType: 'image/[jpg|png|jpeg|gif]' }),
      ]
    })
  ) file: Express.Multer.File) {

    console.log(file);
    return;
  }

}
