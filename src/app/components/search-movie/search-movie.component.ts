import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {
  searchStr: string;
  @Output() searchVal: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  searchMovie() {
    this.searchVal.emit(this.searchStr);
  }

}
