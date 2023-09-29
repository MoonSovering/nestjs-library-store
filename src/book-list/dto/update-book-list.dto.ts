import { PartialType } from '@nestjs/mapped-types';
import { CreateBookListDto } from './create-book-list.dto';

export class UpdateBookListDto extends PartialType(CreateBookListDto) {}
