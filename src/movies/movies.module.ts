import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesController } from './movies.controller.js';
import { MoviesService } from './movies.service.js';
import { Movie, MovieSchema } from './schemas/movie.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
