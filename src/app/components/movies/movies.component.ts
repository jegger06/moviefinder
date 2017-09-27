import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularLists: Array<Object> = [];
  topRatedLists: Array<Object> = [];
  upcomingLists: Array<Object> = [];
  rating: Array<number> = [];

  constructor(private movieService: MovieService) {
    this.movieService.getPopular().subscribe(res => {
      for(let  i = 0; i < 8; i++) {
        this.popularLists.push(res.results[i]);
      }
    });

    this.movieService.getTopRated().subscribe(res => {
      for(let i = 0; i < 8; i++) {
        this.topRatedLists.push(res.results[i]);
      }
    });

    this.movieService.getUpcoming().subscribe(res => {
      for(let i = 0; i < 8; i++) {
        this.upcomingLists.push(res.results[i]);
        this.rating.push(i);
      }
    });

  }

  ngOnInit() {
  }

}
