import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmplHistOb } from '../empl-hist-ob';
import { ScheduleService } from './schedule.service';
import { Time } from '@angular/common';
import { JoinedCard } from '../joined-card';
import {DateOb} from '../date-ob';
import {AppDataService} from './app-data.service';

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
  serverString = this.dataService.serverString;

  constructor(
    private http: HttpClient,
    private scheduleServ: ScheduleService,
    private dataService: AppDataService
  ) {}

  today: Date = this.scheduleServ.today;
  currentYear: number = this.scheduleServ.currentYear;
  currentMonth: number = this.scheduleServ.currentMonth;
    myheaders: HttpHeaders;
    myparams: HttpParams;
    myMonthparams: HttpParams;

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
          .append('month', (this.currentMonth  + 1).toString())
          .append('responseType', 'json')
          .append('withCredentials', 'true');
        this.myMonthparams = new HttpParams()
          .append('year', this.currentYear.toString())
          .append('month', (this.currentMonth).toString())
          .append('responseType', 'json')
          .append('withCredentials', 'true');
        // console.log('loading schedule');
        this.loadEmployMonthCards();
        this.scheduleServ.dateChange.subscribe((ch) => {
          this.today = this.scheduleServ.today;
          this.currentYear = this.scheduleServ.currentYear;
          this.currentMonth = this.scheduleServ.currentMonth;
          this.myparams = new HttpParams()
          .append('year', this.currentYear.toString())
          .append('month', (this.currentMonth  + 1).toString())
          .append('responseType', 'json')
          .append('withCredentials', 'true');
          this.loadEmployMonthCards();
        });
  }

  loadEmployMonthCards() {
    this.http
      .get(
        'http://' + this.serverString + '/schedule/allmonthcards',
        {
          headers: this.myheaders,
          params: this.myparams
        }
      )
      .subscribe((response: JoinedCard[]) => {
        // let mcds:JoinedCard = JSON.parse(response)
        response.forEach((element: JoinedCard) => {
          // console.log('got month card ' + JSON.stringify(element.t2));
          this.emplMonthCards.push(element);
        });
      });
  }

  sendCards(cards: DateOb[]) {
    this.http
      .post('http://' + this.serverString + '/schedule/setcards', JSON.stringify(cards), {headers: this.myheaders})
      .subscribe((response: any) => {
      },
      (err) => console.log(err),
      () => console.log('All sent'));
  }

  sendCard(card: DateOb) {

    this.http
      .post('http://' + this.serverString + '/schedule/datesave', JSON.stringify(card), {headers: this.myheaders})
      .subscribe((response: number) => {
        if (null == card.id){
          console.log('response cardID from service ' + response);
          card.id = response;
          this.scheduleServ.newCardWithId.next(card);
        }
      },
      (err) => console.log(err),
      () => console.log('All sent'));
  }

  loadEmployeesHist() {
    this.http
      .get('http://' + this.serverString + '/employees/hist')
      .subscribe((response: EmplHistOb[]) => {
        response.forEach((element) => {
          this.employHistData.push(element);
        });
      });
  }
  sendDeleteCards(card: DateOb[]) {
    this.http
      .post('http://' + this.serverString + '/schedule/dcards', JSON.stringify(card), {headers: this.myheaders})
      .subscribe((response: any) => {
        },
        (err) => console.log(err),
        () => console.log('All delete sent'));
  }

  sendDeleteCard(crdID: number, date: Date, eid: number) {
    // console.log('received for sending dates ' + date);
    const myDelparams: HttpParams = new HttpParams()
      .append('id', crdID.toString())
      .append('date', date.toString())
      .append('employeeid', eid.toString());
    this.http
      .get('http://' + this.serverString + '/schedule/datedelete',  {params: myDelparams})
      .subscribe((response: any) => {
        },
        (err) => console.log(err),
        () => console.log('Delete sent'));
  }
}
