import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieDetails(this.movieId).subscribe(res => {
      console.log(res);
      this.movie = res;
      const time = res.runtime;
      let hr = Math.floor(time / 60);
      let min = time % 60;
      let hour = (hr == 0 ? '' : (hr > 1 ? hr+' hrs' : hr+ ' hr'));
      let minutes = (min == 0 ? '' : (min > 1 ? ' & ' +min+ ' mins' : ' & '+min+' min'));
      this.runTime = hour + minutes;
    });
  }

}
