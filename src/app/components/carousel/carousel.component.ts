import { CommonModule } from '@angular/common';
import { afterRender, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { IMoviesByGenreResult } from '../../models/IMoviesByGenreResult';
import { delay } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselComponent implements AfterViewInit {
  results = signal<IMoviesByGenreResult[] | null>(null);

  @Input({required: true})
  set inputResultMovie(results: IMoviesByGenreResult[]){
    this.results.set(results);
  }

  @ViewChild('swiperContainer') swiperContainerRef!: ElementRef;
  
  ngAfterViewInit(): void {
    const swiper_container = this.swiperContainerRef.nativeElement;
    
    swiper_container.slidesPerView = 4
    swiper_container.speed = 500
    swiper_container.loop = true
    swiper_container.navigation = true

    swiper_container.autoplay = {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }

    swiper_container.breakpoints = {
      320: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 4
      },
    }

    swiper_container.initialize();
  }
}
