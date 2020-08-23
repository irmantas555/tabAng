import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateOb } from '../date-ob';
import { Subject } from 'rxjs';
import {AppDataService} from "./app-data.service";

@Injectable({
  providedIn: 'root'
})
export class DatesService{
  dates = new Subject<DateOb>();
  serverString = this.dataService.serverString
  constructor(private http: HttpClient, private dataService:AppDataService) { }


  getDates() {
    this.http
      .get('http://' + this.serverString + '/dates')
      .subscribe((response: DateOb[]) => {
        response.forEach((element) => {
          this.dates.next(element);
        });
      });
  }



}
