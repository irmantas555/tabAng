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
import { AppDataService } from '../app-data.service';
import { CalendarDate } from '../calendar-date';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
    employees:Empl[]=this.appdataservice.allEmployees;
    datedata:DateOb[];
    empljobtdata:EmplJobData[]=this.appdataservice.allEmplJobData;
    departments:Department[]=this.appdataservice.allDepartments;
    causedata:Cause[]=this.appdataservice.allCauses
    countrydata:Country[]=this.appdataservice.allCountries;
    holidays:Holiday[]=this.appdataservice.allHolidays;
    shifts:Shift[]=this.appdataservice.allShifts;
    
    emlpCards:CardsArr[];
    
    thisMonthDates:DateOb[];
    thisMonthCards:CardOb[];

    today:Date = this.scheduleServ.today;
    currentYear:number=this.scheduleServ.currentYear;
    currentMonth:number=this.scheduleServ.currentMonth;
    daysinMonth:number;
    firstMonthDayWeekday:number;


  constructor(private scheduleServ:ScheduleService, private scheduleHttp:ScheduleHhtpService, 
    private chDetect:ChangeDetectorRef, private appdataservice:AppDataService) { }

  ngOnInit(): void {
    this.today= this.scheduleServ.today;
    this.currentYear=this.scheduleServ.currentYear;
    this.currentMonth=this.scheduleServ.currentMonth;
    this.scheduleServ.dateChange.subscribe((ch)=>{
      this.today= this.scheduleServ.today;
      this.currentYear=this.scheduleServ.currentYear;
      this.currentMonth=this.scheduleServ.currentMonth;
    })
    // this.today = new Date();
    // this.currentMonth = this.today.getMonth()
    // this.currentYear = this.today.getFullYear();
    // this.daysinMonth = new Date(this.currentYear, this.currentMonth, 0).getDate()
    // this.getthisMonthDates()
    // this.loadWorkers();
    // this.loadToday();
  }

  nextCause(){

    this.appdataservice.allShifts.forEach(element => {
      console.log(element);
    });
  };

  nextMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth()+1);
    this.scheduleServ.newDateData(this.today)
  };

  prevMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth()-1);
    this.scheduleServ.newDateData(this.today)
  };

















  // getthisMonthDates(){
  //   this.thisMonthDates = [];
  //   if (this.datedata === undefined || this.datedata.length == 0){
  //     from(this.datedata)
  //     .pipe(
  //       filter(dd=>dd.date.getMonth() == this.currentMonth)
  //     )
  //     .subscribe((filtered)=>this.thisMonthDates.push(filtered));
  //   };
  // };















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
