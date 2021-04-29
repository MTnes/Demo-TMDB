import { Component, OnInit } from '@angular/core';
import { Language } from './shared/models/language.model';
import { GetDataService } from './shared/services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gdService: GetDataService) {}

  ngOnInit() {
    this.gdService.LanguageFetch();
  }


}
