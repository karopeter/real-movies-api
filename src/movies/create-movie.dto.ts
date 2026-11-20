import { IsString, IsNotEmpty, IsInt, IsNumber, Length, Min, Max } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @Length(1, 150)
    title: string;

    @IsString()
    @Length(10, 1000)
    description: string;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsInt()
    @Min(1888)
    @Max(2100)
    releaseYear: number;

    @IsNumber({ maxDecimalPlaces: 1 })
    @Min(0)
    @Max(10)
    rating: number;
}