import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmployeeObj } from './employee-obj';
import { EmplHistOb } from './empl-hist-ob';
import { Empl } from './empl';
import { Employee } from './employee';
import { MonthCard } from './moth-card';
import { ScheduleService } from './schedule.service';
import { Time } from '@angular/common';
import { PartialObserver } from 'rxjs';
import { JoinedCard } from './joined-card';
import {DateOb} from './date-ob';

// tslint:disable-next-line:class-name
interface type4{
  employeeId: number;   // Emlp
  day: number;          // DayCard
  cause: number;        // DayCard
  startTime: Time;      // DayCard
  endTime: Time;        // DayCard
  causeStr: string;     // Cause
  causeCod: string;     // Cause
  extraTime: number;    // calculated
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleHhtpService {
  employHistData: EmplHistOb[] = [];
  emplMonthCards: JoinedCard[] = [];

  constructor(
    private http: HttpClient,
    private scheduleServ: ScheduleService
  ) {}

  today: Date = this.scheduleServ.today;
  currentYear: number = this.scheduleServ.currentYear;
  currentMonth: number = this.scheduleServ.currentMonth;

    myheaders: HttpHeaders;
    myparams: HttpParams;

  dateparam;

  // const myObserver:PartialObserver = {
  //   next: x => console.log(`Observer next value: ${x}`),
  //   error: err => console.error(`Observer error value: ${err}`),
  //   complete: () => console.log(`Observer complete notification`)
  // };

  init(){
        // calendar section
        this.today = this.scheduleServ.today;
        this.currentYear = this.scheduleServ.currentYear;
        this.currentMonth = this.scheduleServ.currentMonth;
        this.myheaders = new HttpHeaders().append('Content-Type', 'application/json'),
          this.myparams = new HttpParams()
          .append('year', this.currentYear.toString())
          .append('month', this.currentMonth.toString())
          .append('responseType', 'json')
          .append('withCredentials', 'true');
        console.log('loading schedule');
        this.loadEmployMonthCards();
        this.scheduleServ.dateChange.subscribe((ch) => {
          this.today = this.scheduleServ.today;
          this.currentYear = this.scheduleServ.currentYear;
          this.currentMonth = this.scheduleServ.currentMonth;
          this.myparams = new HttpParams()
          .append('year', this.currentYear.toString())
          .append('month', this.currentMonth.toString())
          .append('responseType', 'json')
          .append('withCredentials', 'true');
          this.loadEmployMonthCards();
        });
  }

  loadEmployMonthCards() {
    this.http
      .get(
        'http://localhost:8080/schedule/allmonthcards',
        {
          headers: this.myheaders,
          params: this.myparams
        }
      )
      .subscribe((response: JoinedCard[]) => {
        // let mcds:JoinedCard = JSON.parse(response)
        response.forEach((element: JoinedCard) => {
          // console.log('got month card ' + element.t1.firstName)
          this.emplMonthCards.push(element);
        });
      });
  }

  sendCards(cards: DateOb[]) {
    this.http
      .post('http://localhost:8080/schedule/setcards', JSON.stringify(cards), {headers: this.myheaders})
      .subscribe((response: EmplHistOb[]) => {
      },
      (err) => console.log(err),
      () => console.log('All sent'));
  }

  loadEmployeesHist() {
    this.http
      .get('http://localhost:8080/employees/hist')
      .subscribe((response: EmplHistOb[]) => {
        response.forEach((element) => {
          this.employHistData.push(element);
        });
      });
  }


}
