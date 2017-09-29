import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
  apiKey: string;
  d: any = new Date();
  currentDate: string = this.d.toISOString().split('T')[0];
  nextDate: string = new Date(this.d.setMonth(this.d.getMonth() + 1)).toISOString().split('T')[0];
  
  constructor(private jsonp: Jsonp) {
    this.apiKey = 'a9296b5a3722586a5ef3204d246148e8';
  }

  getPopular() {
    return this.jsonp.get(`https://api.themoviedb.org/3/movie/popular?callback=JSONP_CALLBACK&api_key=${this.apiKey}&language=en-US&page=1`)
      .map(res => res.json());
  }

  getTopRated() {
    return this.jsonp.get(`https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK&api_key=${this.apiKey}&language=en-US&page=1`)
      .map(res => res.json());
  }

  getUpcoming() {
    return this.jsonp.get(`https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&api_key=${this.apiKey}&primary_release_date.gte=${this.currentDate}&primary_release_date.lte=${this.nextDate}`)
      .map(res => res.json());
  }

  getMovieDetails(id: number) {
    return this.jsonp.get(`https://api.themoviedb.org/3/movie/${id}?callback=JSONP_CALLBACK&api_key=${this.apiKey}&append_to_response=videos,credits`)
      .map(res => res.json());
  }

  searchMovie(searchStr: string) {
    return this.jsonp.get(`https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&api_key=${this.apiKey}&query=${searchStr}`)
      .map(res => res.json());
  }

}