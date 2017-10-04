import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { moviesTrigger, searchTrigger, movieListTrigger } from '../../animations/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [
    moviesTrigger,
    searchTrigger,
    movieListTrigger
  ]
})
export class MoviesComponent implements OnInit {
  searchLists: Array<Object> = [];
  popularLists: Array<Object> = []; 
  topRatedLists: Array<Object> = [];
  upcomingLists: Array<Object> = [];
  rating: Array<number> = [];
  emptyResult: boolean = false;
  showResult: boolean = false;
  loadingPopular: boolean = true;
  loadingTopRated: boolean  = true;
  loadingUpcoming: boolean = true;
  loadingSearch: boolean = false;

  constructor(private movieService: MovieService) {
    this.movieService.getPopular().subscribe(res => {
      for(let  i = 0; i < 8; i++) {
        this.popularLists.push(res.results[i]);
      }
      this.loadingPopular = false;
    });

    this.movieService.getTopRated().subscribe(res => {
      for(let i = 0; i < 8; i++) {
        this.topRatedLists.push(res.results[i]);
      }
      this.loadingTopRated = false;
    });

    this.movieService.getUpcoming().subscribe(res => {
      for(let i = 0; i < 8; i++) {
        this.upcomingLists.push(res.results[i]);
        this.rating.push(i);
      }
      this.loadingUpcoming = false;
    });
    
  }

  ngOnInit() {
  }

  searchMovie(searchStr: string) {
    this.loadingSearch = true;
    this.searchLists = [];
    if(searchStr != undefined && searchStr.trim() != '') {
      this.showResult = true;
      let movieStr = searchStr.trim();
      this.movieService.searchMovie(movieStr).subscribe(res => {
        if(res.results.length != 0) {
          for(let i = 0; i < 8; i++) {
            if(res.results[i] != undefined) {
              this.searchLists.push(res.results[i]);
            }
          }
          this.emptyResult = false;
          this.loadingSearch = false;
        } else {
          setTimeout(() => {
            this.loadingSearch = false;
            this.emptyResult = true;
          }, 1000);
        }
      });
    } else {
      this.showResult = false;
    }
  }

}
