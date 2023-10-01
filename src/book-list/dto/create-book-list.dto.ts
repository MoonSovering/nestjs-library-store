
import { IsString, IsNotEmpty } from "class-validator";


export class CreateBookListDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly categories: [string];


    image: Express.Multer.File

}
