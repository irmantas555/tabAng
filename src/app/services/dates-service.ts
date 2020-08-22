import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateOb } from '../date-ob';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService{
  dates = new Subject<DateOb>();

  constructor(private http: HttpClient) { }


  getDates() {
    this.http
      .get('http://localhost:8080/dates')
      .subscribe((response: DateOb[]) => {
        response.forEach((element) => {
          this.dates.next(element);
        });
      });
  }



}
