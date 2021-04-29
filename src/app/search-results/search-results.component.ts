import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { GetDataService } from '../shared/services/get-data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  movies: Movie[] = [

  ];

  constructor(private gdService: GetDataService) { }

  ngOnInit(): void {
    this.gdService.movies_changed.subscribe(
      (data: Movie[]) => {
        this.movies = data;
      }
    );
  }


}
