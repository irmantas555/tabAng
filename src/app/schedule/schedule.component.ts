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
    thisMonthCalendar:CalendarDate[]=[];
  
    thisMonthDates:DateOb[];
    thisMonthCards:CardOb[];

    today:Date;
    daysinMonth:number;
    currentYear:number=this.sheduleServ.currentYear;
    currentMonth:number=this.sheduleServ.currentMonth;
    firstMonthDayWeekday:number;


  constructor(private sheduleServ:ScheduleService, private scheduleHttp:ScheduleHhtpService, 
    private chDetect:ChangeDetectorRef, private appdataservice:AppDataService) { }

  ngOnInit(): void {
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


  fillCalendar(){
    let empCCard:CalendarDate
    
    for(let i=1;i<=this.daysinMonth;i++){
        empCCard = new CalendarDate;
        empCCard.day=i;
        empCCard.month=this.currentMonth;
        empCCard.year=this.currentYear;
        empCCard.weekday=(this.firstMonthDayWeekday + ((i -1) % 7));
        this.thisMonthCalendar.push(empCCard);
    };
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
