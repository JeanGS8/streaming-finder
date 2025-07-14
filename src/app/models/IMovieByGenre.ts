import { IMoviesByGenreResult } from "./IMoviesByGenreResult"

export interface IMovieByGenre {
  genres: {
    id: number,
    name: string,
    movies: {
      page: number,
      results: IMoviesByGenreResult[]
    }
  }[]
}
