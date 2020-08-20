import {Component, OnInit, ElementRef, Input} from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { ScheduleHhtpService } from '../schedule-http.service';
import {  ChangeDetectorRef } from '@angular/core';
import { Cause } from '../cause';
import { DayCard } from '../day-card';
import { AppDataService } from '../app-data.service';
import { CalendarDate } from '../calendar-date';
import { JoinedCard } from '../joined-card';
import { RouterLink, Router } from '@angular/router';
import {AlterDataSet} from '../alter-data-set';
import {DateOb} from '../date-ob';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
    emlpCards: JoinedCard[] = [];
    thisMonthDates: CalendarDate[] = [];
    today: Date = this.scheduleServ.today;
    currentYear: number = this.scheduleServ.currentYear;
    currentMonth: number = this.scheduleServ.currentMonth;
    daysinMonth: number;
    firstMonthDayWeekday: number;

    modal = false;
    causes: Cause[] = [];
    times: string[] = [];
    // curentW: AlterDataSet = new AlterDataSet(0);
    workersA: AlterDataSet[] = [];
    causeObject: Cause = new Cause();
    alterDates: DateOb[] = [];
    startToAlter;
    endToAlter;
    duraToAlter;
    // now: boolean;

  selectedCausesControl = new FormControl();

    constructor(private scheduleServ: ScheduleService, private scheduleHttp: ScheduleHhtpService,
                private chDetect: ChangeDetectorRef, private appdataservice: AppDataService,
                private router: Router, private el: ElementRef) { }

  ngOnInit(): void {
    // calendar section
    this.today = this.scheduleServ.today;
    this.currentYear = this.scheduleServ.currentYear;
    this.currentMonth = this.scheduleServ.currentMonth;
    this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
    this.scheduleServ.dateChange.subscribe((ch) => {
      this.today = this.scheduleServ.today;
      this.currentYear = this.scheduleServ.currentYear;
      this.currentMonth = this.scheduleServ.currentMonth;
      this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
      // month caards depend on date change
      this.emlpCards = this.scheduleHttp.emplMonthCards;
    });
    // month cards section
    this.emlpCards = this.scheduleHttp.emplMonthCards;
    // alter-box section
    this.causes = this.appdataservice.allCauses;
    this.causeObject = this.appdataservice.allCauses[0];
    // this.causeToAlter  = this.appdataservice.allCauses[0].id;
    this.makeTimes();
    // this.appdataservice.employeedata.pipe(
    //   take(10)
    //   ).subscribe((empl) => {
    //     this.workers.push(empl);
    //   });
    this.enterDates();
  }

  nextCause(){
    // const now: boolean;
    // this.router.navigate(['/cardinputmodal'])
    // this.modal=true;
    // this.scheduleServ.celineStatus.next(this.now === true ? false : true);
    // this.now === true ? this.now = false : this.now = true;
  }

  nextMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth() + 1);
    this.emlpCards = [];
    this.scheduleServ.newDateData(this.today);
  }

  prevMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth() - 1);
    this.emlpCards = [];
    this.scheduleServ.newDateData(this.today);
  }


  makeTimes() {
    for (let indexH = 0; indexH < 25; indexH++) {
      for (let indexM = 0; indexM < 50; indexM += 15) {
        if (indexM === 0){
          this.times.push('' + indexH + ':00:00');
        } else{
          this.times.push('' + indexH + ':' + indexM + ':00');
        }
      }
    }
    this.startToAlter = ('8:00:00');
    this.endToAlter = ('17:00:00');
  }

  onClick(){
      this.newCauses();
      this.scheduleHttp.sendCards(this.alterDates);
      this.alterDates = [];
      this.modal = false;
  }

  onRetreat(){
      this.modal = false;
  }

  removeWorker(val: any){
      this.workersA.splice(val.currentTarget.closest('li').value, 1 );
  }



  trackById(index: number, worker: any){
    if (!worker){ return null ; }
    // console.log('w ' + index + 'i ' + worker);
    return worker.id;
  }

  compareFn(c1: Cause, c2: Cause): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  dismisModal(){
    this.modal = false;
  }

enterDates(){
  // let v1 = this.scheduleServ.rowsSub;
  // let v2= this.scheduleServ.colsSub;
  let emplId: number;
  let found: boolean;
  let ffound: boolean;
  let tempAlter: AlterDataSet;
  // zip(v1,v2).pipe(delay(200)).subscribe((pair) =>{
  this.scheduleServ.colsRowsSub.subscribe((pair) => {
      // console.log(pair);
      if (pair.row === null){
        return;
      }
      emplId = this.emlpCards[pair.row].t1.employeeId;
      // console.log('empId' + emplId);
      found = false;
      ffound = false;
      this.workersA.forEach(element => {
      if (element.employeeId === emplId){
        element.days.forEach(day => {
          if (day === pair.col) {
            // console.log('pair' + pair.col + 'day' + day);
            ffound = true;
            found = true;
          }
          }
        );
        if (!ffound){
        element.days.push(pair.col);
        found = true;
        }
    }});
      if (!found){
        tempAlter = new AlterDataSet(emplId);
        tempAlter.firstName = this.emlpCards[pair.row].t1.firstName;
        tempAlter.lastName = this.emlpCards[pair.row].t1.lastName;
        tempAlter.days.push(pair.col);
        this.workersA.push(tempAlter);
      }
      found = false;
      // this.workersA.forEach(element => {
      //   console.log(element);
      // });
    });

}

mousedown(){
  if (this.scheduleServ.mouseDProperty === false){
    this.scheduleServ.mouseDProperty = true;
    this.workersA = [];
  }
}
mouseup(){
  // console.log('mouseup fired');
  if (this.scheduleServ.mouseDProperty === true){
    this.scheduleServ.mouseDProperty = false;
    this.scheduleServ.celineStatus.next(false);
    this.scheduleServ.dCardChange.next(false);
    this.modal = true;
  }
}

  newCauses(){
    let id;
    let tempDCard = new DayCard();
    this.workersA.forEach((emplToAlter) => {
        id = emplToAlter.employeeId;
        emplToAlter.days.forEach((day) => {
          const tempDate = new DateOb();
          tempDate.employeeId = id;
          tempDate.date = new Date(this.currentYear, this.currentMonth, day);
          tempDate.cause = this.causeObject.id;
          tempDate.startTime = this.startToAlter;
          tempDate.duration = this.getTimeDiff(this.startToAlter, this.endToAlter);
          tempDCard.cause = this.causeObject.id;
          tempDCard.day = day;
          tempDCard.startTime = this.startToAlter;
          this.appdataservice.allCauses.forEach((cause) => {
            if (cause.id === tempDCard.cause) {
              tempDCard.causeStr = cause.cause;
              tempDCard.causeCod = cause.cod;
            }
          });
          this.scheduleServ.newCardValue = tempDCard;
          this.scheduleServ.dCardChange.next(true);
          this.alterDates.push(tempDate);
        });
    });
  }

  getTimeDiff(start, end){
      const startA: string[] = start.split(':');
      const endA: string[] = end.split(':');
      // console.log(startA);
      // console.log(endA);
      let dura = 0;
      if (Number(startA[1]) > Number(endA[1])){
          dura = new Date(1950, 1, 1, Number(startA[0]), Number(startA[1]), Number(startA[2] )).getMinutes() -
        new Date(1950, 1, 1, Number(endA[0]), Number(endA[1]), Number(end[2])).getMinutes();
        } else {
          dura = new Date(1950, 1, 2, Number(endA[0]), Number(endA[1]), Number(endA[2] )).getMinutes() -
          new Date(1950, 1, 1, Number(startA[0]), Number(startA[1]), Number(startA[2] )).getMinutes();
        }
      return dura;
  }



}
