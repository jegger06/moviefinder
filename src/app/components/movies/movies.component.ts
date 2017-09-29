import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  searchLists: Array<Object> = [];
  popularLists: Array<Object> = [];
  topRatedLists: Array<Object> = [];
  upcomingLists: Array<Object> = [];
  rating: Array<number> = [];
  emptyResult: boolean = false;
  showResult: boolean = false;

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

  searchMovie(searchStr: string) {
    // if(searchStr.trim() != '') {
    //   this.showResult = true;
    //   let movieStr = searchStr.trim();
    //   this.movieService.searchMovie(movieStr).subscribe(res => {
    //     if(res.results.length != 0) {
    //       this.searchLists = [];
    //       for(let i = 0; i < 16; i++) {
    //         if(res.results[i] != undefined) {
    //           this.searchLists.push(res.results[i]);
    //         }
    //       }
    //       this.emptyResult = false;
    //     } else {
    //       this.emptyResult = true;
    //     }
    //     console.log(this.searchLists);
        
    //   });
    // } else {
    //   this.showResult = false;
    //   // return;
    // }


    if(searchStr != undefined && searchStr.trim() != '') {
      this.showResult = true;
      let movieStr = searchStr.trim();
      this.movieService.searchMovie(movieStr).subscribe(res => {
        if(res.results.length != 0) {
          this.searchLists = [];
          for(let i = 0; i < 16; i++) {
            if(res.results[i] != undefined) {
              this.searchLists.push(res.results[i]);
            }
          }
          this.emptyResult = false;
        } else {
          this.emptyResult = true;
        }
      });
    } else {
      this.showResult = false;
    }
    
  }

}
