import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryResponse } from './utils/cloudinaryResponse';
const streamifier = require('streamifier');


@Injectable()
export class CloudinaryService {


  async uploadFile( file: Express.Multer.File ) {

    const uploadFile = await new Promise<CloudinaryResponse>( (resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream( (error, result) => {

        if(error) return reject(error);
        resolve(result);

      } );

      streamifier.createReadStream( file.buffer ).pipe( upload )

    })

  
  
    return uploadFile.secure_url;
  }

}
