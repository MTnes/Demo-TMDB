import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetDataService } from '../shared/services/get-data.service';
import { Movie } from '../shared/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInfo') searchInfo;

  constructor(private gdService: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.gdService.clearArray();
  }

  onSearch() {
    this.gdService.getSearchValue(this.searchInfo.nativeElement.value);
  }

  keyboardEntry(value: string) {
    this.searchInfo.nativeElement.value  = this.searchInfo.nativeElement.value.concat(value);
  }

  onClear() {
    this.searchInfo.nativeElement.value = '';
  }

  onBackspace() {
    this.searchInfo.nativeElement.value = this.searchInfo.nativeElement.value.substring(0,this.searchInfo.nativeElement.value.length-1);
  }

  SpecialCharPass(arg: string) {

    if(arg === 'doubleQuotes') {
      this.searchInfo.nativeElement.value  = this.searchInfo.nativeElement.value.concat('"');
      return
    } else if(arg === 'singleQuote') {
      this.searchInfo.nativeElement.value  = this.searchInfo.nativeElement.value.concat("'");
      return
    } else if(arg === 'hiphen') {
      this.searchInfo.nativeElement.value  = this.searchInfo.nativeElement.value.concat('-');
      return
    }
  }

  putValue(arg: string) {
    this.searchInfo.nativeElement.value = arg;
  }

}
