import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Object;
  @Input() rating: any;
  fulls: any = [];
  halfs: any;
  emptys: any;

  constructor() { }

  ngOnInit() {
    let num = this.movie['vote_average'] / 2;
    let full = Math.floor(num);
    let half = (num % 1 > 0 ? 1 : 0);
    let empty = (full + half == 5 ? 0 : 5 - (full + half));
    this.fulls = Array(full).fill(1);
    this.halfs = Array(half).fill(2);
    this.emptys = Array(empty).fill(0);
  }

}
