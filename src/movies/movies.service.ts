import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from "mongoose"
import { randomUUID } from 'crypto';
import { CreateMovieDto } from './create-movie.dto.js';
import { UpdateMovieDto } from './update-movie.dto.js';
import { Movie } from './schemas/movie.schema.js';


@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

    async findAll(genre?: string, year?: number) {
        const filter: QueryFilter<Movie> = {};
        if (typeof genre === 'string' && genre) filter.genre = genre;
        if (year) filter.releaseYear = year;

        return this.movieModel
          .find(filter)
          .collation({ locale: 'en', strength: 2 }) // case-insensitive match
          .exec();
    }

    async findOne(id: string) {
        const movie = await this.movieModel.findById(id).exec();
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    async create(createMovieDto: CreateMovieDto) {
        return this.movieModel.create(createMovieDto);
    }

    async update(id: string, updateMovieDto: UpdateMovieDto) {
        const updated = await this.movieModel
          .findByIdAndUpdate(id, updateMovieDto, { new: true, runValidators: true })
          .exec();

        if (!updated) {
          throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return updated;
    }

    async remove(id: string): Promise<void> {
        const deleted = await this.movieModel.findByIdAndDelete(id).exec();
        if (!deleted) {
          throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
    }
}