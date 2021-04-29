import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Movie } from '../models/movie.model';
import { Language } from '../models/language.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import 'rxjs/Rx'

@Injectable()
export class GetDataService {

  movies: Movie[] = [];
  languages: Language[] = [];
  search_url = "https://api.themoviedb.org/3/search/movie?api_key=998173ff06287096cc8caf75894bec46&language=en-US&page=1&include_adult=false&query="
  image_base = "https://image.tmdb.org/t/p/w500";
  lang_url = "https://api.themoviedb.org/3/configuration/languages?api_key=998173ff06287096cc8caf75894bec46";
  movies_changed = new Subject<Movie[]>();

  constructor(private http: HttpClient, private router: Router) { }

  clearArray() {
    this.movies = [];
  }

  getSearchValue(arg: string) {
    this.onSearch(arg);
  }

  LanguageFetch() {
    this.http.get(this.lang_url).subscribe(
      (data: any) => {
        for(var i = 0 ; i < data.length; i++) {
          const lang = new Language(data[i].iso_639_1, data[i].english_name);
          this.languages.push(lang);
        }
      }
    )
  }

  onSearch(arg: string) {

    this.http.get(this.search_url+arg).subscribe(
      (data: any) => {
        var movies_fetch: any[];
        movies_fetch = data.results

        for(var i=0; i< movies_fetch.length; i++) {
          var image_path = this.image_base;
          if(movies_fetch[i].backdrop_path) {
            image_path += movies_fetch[i].backdrop_path;
          } else {
            image_path = null;
          }
          const iso: string = movies_fetch[i].original_language;
          this.movies.push(new Movie(movies_fetch[i].title, image_path, this.searchLang(iso).english_name));
        }

        this.movies_changed.next(this.movies);

      }
    );

    this.router.navigate(['/search-result']);

  }


  searchLang(iso: string) {
    const lang = this.languages.find(
      (l) => {
        return l.iso_639_1 === iso;
      }
    );
    return lang;
  }

}
