import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class BookList {

    @Prop({
        required: true,
        trim: true,
        lowercase: true,
    })
    title: string;

    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    author: string;

    @Prop({
        required: true,
        trim: true,
        lowercase: true,
    })
    categories: string;

    @Prop({
        required: true,
        unique: true,
    })
    image: string; 

}

export const BookSchema = SchemaFactory.createForClass(BookList);