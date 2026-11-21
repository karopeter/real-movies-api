import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    releaseYear: number;

    @Prop({ required: true, min: 0, max: 10 })
    rating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);