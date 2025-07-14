import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment.development';
import { IMovieByGenre } from '../models/IMovieByGenre';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${environment.apiUrl}`,
      timeout: 1500,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.bearerToken}`
      }

    })
  }

  async getAllGenres(){
    const response = await this.api.get('/genre/movie/list?language=pt-br');
    const data: IMovieByGenre = response.data;

    data.genres.map((e) => {
      if(e.name.toLowerCase() == "thriller"){
        e.name = "Suspense";
      }
    })
    return data;
  }

  async getMoviesByGenres(){
    const dados: IMovieByGenre = await this.getAllGenres();

    await Promise.all(
      dados.genres.map(async (e) => {
        const response = await this.api.get(`/discover/movie?include_adult=false&include_video=false&language=pt-br&page=1&sort_by=popularity.desc&with_genres=${e.id}`);
        const data = response.data;
        e.movies = data;
  
      })
    )
    console.log(dados);
    return dados;
  }
}
