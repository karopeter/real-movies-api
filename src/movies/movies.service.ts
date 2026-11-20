import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateMovieDto } from './create-movie.dto.js';
import { UpdateMovieDto } from './update-movie.dto.js';

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  rating: number;
}

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: randomUUID(),
      title: 'Inception',
      description: 'A thief who steals secrets through dreams is given one last job.',
      genre: 'Sci-Fi',
      releaseYear: 2010,
      rating: 8.8,
    },
    {
      id: randomUUID(),
      title: 'The Dark Knight',
      description: 'Batman faces the Joker, a criminal mastermind who wants chaos in Gotham.',
      genre: 'Action',
      releaseYear: 2008,
      rating: 9.0,
    },
  ];

  findAll(genre?: string, year?: number) {
    return this.movies.filter(
        (movie) => 
         (!genre || movie.genre.toLowerCase() === genre.toLowerCase()) && 
        (!year || movie.releaseYear === year),
    );
  }

  findOne(id: string) {
    const matchingMovie = this.movies.find((movie) => movie.id === id);

    if (!matchingMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return matchingMovie;
  }

  create(CreateMovieDto: CreateMovieDto) {
    const newMovie: Movie = { id: randomUUID(), ...CreateMovieDto };
    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    const matchingMovie = this.findOne(id); // throws 404 if missing 
    Object.assign(matchingMovie, updateMovieDto);
    return matchingMovie;
  }

  remove(id: string): void {
    const matchingIndex = this.movies.findIndex((movie) => movie.id === id);

    if (matchingIndex === -1) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    this.movies.splice(matchingIndex, 1);
  }
}
