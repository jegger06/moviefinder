import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';

import { MovieService } from './services/movie.service';

const appRoutes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'about', component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    SearchMovieComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
