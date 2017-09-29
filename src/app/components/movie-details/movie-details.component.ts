import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number;
  movie: Object;
  runTime: any;
  casts: Array<Object> = [];
  directors: Array<Object> = [];
  producers: Array<Object> = [];
  rawUrl: string = 'https://www.youtube.com/embed/';
  videoUrls: Array<Object> = [];
  fulls: Array<number> = [];
  halfs: Array<number> = [];
  emptys: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieDetails(this.movieId).subscribe(res => {
      console.log(res);
      this.movie = res;
      const time = res.runtime;
      let hr = Math.floor(time / 60);
      let min = time % 60;
      let hour = (hr == 0 ? '' : (hr > 1 ? hr+' hrs &' : hr+ ' hr &'));
      let minutes = (min == 0 ? '' : (min > 1 ? ' ' +min+ ' mins' : ' '+min+' min'));
      this.runTime = hour + minutes;
      let cast = res.credits.cast;
      for(let i = 0; i < 4; i++) {
        if(cast[i] != undefined) {
          this.casts.push(cast[i]);
        }
      }
      let searchCrew = res.credits.crew;
      for(let i = 0; i < searchCrew.length; i++) {
        if(searchCrew[i].job == 'Director') {
          this.directors.push(searchCrew[i]);
        } else if(searchCrew[i].job == 'Producer') {
          this.producers.push(searchCrew[i]);
        }
      }
      let ytVids = res.videos.results;
      for(let i = 0; i < ytVids.length; i++) {
        this.videoUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl+ytVids[i].key))
      }
      // Rating
      let num = res.vote_average / 2;
      let full = Math.floor(num);
      let half = (num % 1 > 0 ? 1 : 0);
      let empty = (full + half == 5 ? 0 : 5 - (full + half));
      this.fulls = Array(full).fill(1);
      this.halfs = Array(half).fill(2);
      this.emptys = Array(empty).fill(0);
    }, (err) => {
      console.log(err);
      
    }, () => {
      console.log('Done');
      
    });
  }

}