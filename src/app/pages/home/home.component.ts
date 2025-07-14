import { Component, inject, OnInit, signal } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { IMovieByGenre } from '../../models/IMovieByGenre';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  apiResponse = signal<IMovieByGenre>({genres: []});
  #tmdbApi = inject(TmdbService);

  async ngOnInit(): Promise<void> {
    this.apiResponse.set(await this.#tmdbApi.getMoviesByGenres());
  }
}
