
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
    readonly categories: [string];

    @IsString()
    @IsNotEmpty()
    readonly image: string;

}
