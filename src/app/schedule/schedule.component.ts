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
    newCardForAll: DayCard;
    times: string[] = [];
    // workers: Empl[] = [];
    workersA: AlterDataSet[] = [];
    causeObject: Cause = new Cause();
    alterDates: DateOb[] = [];
    startToAlter;
    endToAlter;
    duraToAlter;
    // now: boolean;

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
    this.scheduleServ.newDateData(this.today);
  }

  prevMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth() - 1);
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
  }

  onClick(){
      this.newCauses();
      this.modal = false;
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
    this.modal = true;
  }
}


  newCauses(){
    let id;
    this.workersA.forEach((emplToAlter) => {
        id = emplToAlter.employeeId;
        emplToAlter.days.forEach((day) => {
          const tempDate = new DateOb();
          tempDate.employeeId = id;
          tempDate.date = new Date(this.currentYear, this.currentMonth, day);
          console.log(this.causeObject);
          tempDate.cause = this.causeObject.id;
          tempDate.startTime = this.startToAlter;
          tempDate.duration = this.getTimeDiff(this.startToAlter, this.endToAlter);
          this.alterDates.push(tempDate);
          console.log(tempDate);
        });
    });
  }

  getTimeDiff(start, end){
      const startA: string[] = start.split(':');
      const endA: string[] = end.split(':');
      let dura = 0;
      if (Number(startA[1]) > Number(endA[1])){
          dura = new Date(1950, 1, 1, Number(startA[1]), Number(startA[2]), Number(startA[3] )).getMinutes() -
        new Date(1950, 1, 1, Number(endA[1]), Number(endA[2]), Number(end[3])).getMinutes();
        } else {
          dura = new Date(1950, 1, 2, Number(endA[1]), Number(endA[2]), Number(endA[3] )).getMinutes() -
          new Date(1950, 1, 1, Number(startA[1]), Number(startA[2]), Number(startA[3] )).getMinutes();
        }
      return dura;
  }



  // getthisMonthDates(){
  //   this.thisMonthDates = [];
  //   if (this.datedata === undefined || this.datedata.length === 0){
  //     from(this.datedata)
  //     .pipe(
  //       filter(dd=>dd.date.getMonth() === this.currentMonth)
  //     )
  //     .subscribe((filtered) =>this.thisMonthDates.push(filtered));
  //   };
  // };















  // loadToday(){
  //   this.sheduleServ.today.subscribe((tod) =>{
  //     console.log('today = ' + tod )
  //     this.today = tod;
  //   })
  //   this.sheduleServ.daysInThisMonth.subscribe((days) =>{
  //     console.log('today = ' + days )
  //     this.daysinMonth = days;
  //   })
  //   this.sheduleServ.weekDayOf1MDay.subscribe((day) =>{
  //     console.log('today = ' + day )
  //     this.daysinMonth = day;
  //   })
  // };


}
