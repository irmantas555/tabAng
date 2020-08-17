import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { EmployeeObj } from '../employee-obj';
import { timeout, map, delay, filter, mapTo, flatMap } from 'rxjs/operators';
import { of, interval,from, generate } from 'rxjs';
import { ScheduleHhtpService } from '../schedule-http.service';
import { Department } from '../department';
import { EmplJobData } from '../empl-job-data';
import { Holiday } from '../holiday';
import { Shift } from '../shift';
import { Payment } from '../payment';
import {  ChangeDetectorRef } from '@angular/core';
import { Empl } from '../empl';
import { Country } from '../country';
import { DateOb } from '../date-ob';
import { Cause } from '../cause';
import { CardOb } from '../card-ob';
import { CardsArr } from '../cards-arr';
import { DatesService } from '../dates-service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
    workers:Empl[] = this.scheduleHttp.employeedata;
    datedata:DateOb[];
    empljobtdata:EmplJobData[];
    departments:Department[];
    causedata:Cause[]
    countrydata:Country[];
    holidays:Holiday[];
    shifts:Shift[];
    payments:Payment[];
    emlpCards:CardsArr[];

    thisMonthDates:DateOb[];
    thisMonthCards:CardOb[];

    today:Date;
    daysinMonth:number;
    currentYear:number;
    currentMonth:number;
    firstMonthDayWeekday:number;


  constructor(private sheduleServ:ScheduleService, private scheduleHttp:ScheduleHhtpService, 
    private chDetect:ChangeDetectorRef, private daetesServ:DatesService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.currentMonth = this.today.getMonth()
    this.currentYear = this.today.getFullYear();
    this.daysinMonth = new Date(this.currentYear, this.currentMonth, 0).getDate()
    this.getthisMonthDates()
    // this.loadWorkers();
    // this.loadToday();
  }

  prevMonth(){
      this.today.setMonth(this.today.getMonth()-1)
      this.sheduleServ.newDateData(this.today)
      this.chDetect.detectChanges();
  };

  nextMonth(){
    this.today.setMonth(this.today.getMonth()+1)
    this.sheduleServ.newDateData(this.today)
    this.chDetect.detectChanges();
  };



   loadWorkers(){
     if (this.scheduleHttp.employeedata === undefined || this.scheduleHttp.employeedata.length == 0){
      this.scheduleHttp.loadEmployees();
   }
  }

  subscribeDates(){
      this.daetesServ.dates.subscribe((date)=>{
          this.datedata.push(date)
          console.log('date pushed ' + date.date.getDay)
      });
      this.daetesServ.getDates();  
  };

  getthisMonthDates(){
    this.thisMonthDates = [];
    if (this.datedata !== undefined && this.datedata.length != 0){
      from(this.datedata)
      .pipe(
        filter(dd=>dd.date.getMonth() == this.currentMonth)
      )
      .subscribe((filtered)=>this.thisMonthDates.push(filtered));
    };
  };


  getId(){
    from(this.workers)
    .pipe(
      map(empl=>empl.id),
      map(id=>this.makeCards(id))
    ).subscribe(col=>this.emlpCards.push())
  };

  getEmplById(id:number){
    
  };


  makeCards(id:number){
   return generate(1,x=>x<=this.daysinMonth,x=>x+1)
    .pipe(
      mapTo(new CardOb)
    )
      // .subscribe(co=>console.log('Got my cards'+co));
  };














  // loadToday(){
  //   this.sheduleServ.today.subscribe((tod)=>{
  //     console.log('today = ' + tod )
  //     this.today = tod;
  //   })
  //   this.sheduleServ.daysInThisMonth.subscribe((days)=>{
  //     console.log('today = ' + days )
  //     this.daysinMonth = days;
  //   })
  //   this.sheduleServ.weekDayOf1MDay.subscribe((day)=>{
  //     console.log('today = ' + day )
  //     this.daysinMonth = day;
  //   })
  // };
 

}
