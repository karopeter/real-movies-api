import { Body, Controller, Get, Post, Put, Delete, Query, HttpCode, HttpStatus, ParseIntPipe, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import type { UUID } from 'crypto';
import { MoviesService } from './movies.service.js';
import { CreateMovieDto } from './create-movie.dto.js';
import { ParseObjectIdPipe } from './pipes/parse-object-id.pipe.js';
//import { MoviesGuard } from './movies.guard.js';
import { UpdateMovieDto } from './update-movie.dto.js';

@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) {}

    // GET /movies?genre=Action&year=2008
    @Get()
    findAll(
      @Query('genre') genre?: string,
      @Query('year', new ParseIntPipe({ optional: true })) year?: number,
    ) {
      return this.movieService.findAll(genre, year);
    }

    // GET /movies/:id
    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
      return this.movieService.findOne(id);
    }

    // POST /movies
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    // PUT /movies/:id
    @Put(':id')
    update(
      @Param('id', ParseObjectIdPipe) id: string,
      @Body() UpdateMovieDto: UpdateMovieDto,
    ) {
     return this.movieService.update(id, UpdateMovieDto);
    }

    // DELETE /movies/:id
    @Delete(':id')
    // @UseGuards(MoviesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.movieService.remove(id);
    }
}
