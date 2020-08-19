import { Component, OnInit, ElementRef } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { EmployeeObj } from '../employee-obj';
import { timeout, map, delay, filter, mapTo, flatMap, take, groupBy } from 'rxjs/operators';
import { of, interval,from, generate, pipe, zip, Observable } from 'rxjs';
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
import { DayCard } from '../day-card';
import { MonthCard } from '../moth-card';
import { AppDataService } from '../app-data.service';
import { CalendarDate } from '../calendar-date';
import { JoinedCard } from '../joined-card';
import { RouterLink, Router } from '@angular/router';
import { ENETRESET } from 'constants';
import { element } from 'protractor';

class AlterDataSet{
  employeeId:number
  firstName:number
  lastName:number
  days:number[]

  constructor(employeeId:number){
    this.employeeId=employeeId;
    this.days=[]
  }
}
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
    // employees:Empl[]=this.appdataservice.allEmployees;
    // datedata:DateOb[];
    // empljobtdata:EmplJobData[]=this.appdataservice.allEmplJobData;
    // departments:Department[]=this.appdataservice.allDepartments;
    // causedata:Cause[]=this.appdataservice.allCauses
    // countrydata:Country[]=this.appdataservice.allCountries;
    // holidays:Holiday[]=this.appdataservice.allHolidays;
    // shifts:Shift[]=this.appdataservice.allShifts;
    
    emlpCards:JoinedCard[]=[];
    thisMonthDates:CalendarDate[]=[];
    today:Date = this.scheduleServ.today;
    currentYear:number=this.scheduleServ.currentYear;
    currentMonth:number=this.scheduleServ.currentMonth;
    daysinMonth:number;
    firstMonthDayWeekday:number;

    modal:boolean=false;
    causes: Cause[]=[];
    newCardForAll: DayCard;
    times: string[] = [];
    workers:Empl[]=[];
    workersA:AlterDataSet[]=[];
    now:boolean

  constructor(private scheduleServ:ScheduleService, private scheduleHttp:ScheduleHhtpService, 
    private chDetect:ChangeDetectorRef, private appdataservice:AppDataService, private router:Router, private el: ElementRef) { }

  ngOnInit(): void {
    //calendar section
    this.today= this.scheduleServ.today;
    this.currentYear=this.scheduleServ.currentYear;
    this.currentMonth=this.scheduleServ.currentMonth;
    this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
    this.scheduleServ.dateChange.subscribe((ch)=>{
      this.today= this.scheduleServ.today;
      this.currentYear=this.scheduleServ.currentYear;
      this.currentMonth=this.scheduleServ.currentMonth;
      this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
      //month caards depend on date change
      this.emlpCards = this.scheduleHttp.emplMonthCards
    })
    //month cards section
    this.emlpCards = this.scheduleHttp.emplMonthCards
    //alter-box section
    this.causes=this.appdataservice.allCauses;
    this.makeTimes();
    this.appdataservice.employeedata.pipe(
      take(10)  
      ).subscribe((empl)=>{
        this.workers.push(empl)
      })
      this.enterDates();
  }

  nextCause(){
    let now:boolean;
    // this.router.navigate(['/cardinputmodal'])
    // this.modal=true;
    this.scheduleServ.celineStatus.next(this.now==true?false:true)
    this.now==true?this.now=false:this.now=true;
  };

  nextMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth()+1);
    this.scheduleServ.newDateData(this.today)
  };

  prevMonth(){
    this.scheduleServ.today.setMonth(this.today.getMonth()-1);
    this.scheduleServ.newDateData(this.today)
  };

  
  makeTimes() {
    for (let indexH = 0; indexH < 25; indexH++) {
      for (let indexM = 0; indexM < 50; indexM += 15) {
        if (indexM == 0){
          this.times.push('' + indexH + ':00:00');
        } else{
          this.times.push('' + indexH + ':' + indexM + ':00');
        }
      }
    }
  }

  onClick(){
    this.modal=false;
  }

  dismisModal(){
    this.modal=false;
;  }

enterDates(){
  // let v1 = this.scheduleServ.rowsSub;
  // let v2= this.scheduleServ.colsSub;
  let emplId:number;
  let found:boolean;
  let tempAlter:AlterDataSet
  // zip(v1,v2).pipe(delay(200)).subscribe((pair)=>{
    this.scheduleServ.colsRowsSub.subscribe((pair)=>{
      console.log(pair)
      if(pair.row==null){
        return;
      }
    emplId=this.emlpCards[pair.row].t1.employeeId
    found = false;
    this.workersA.forEach(element => {
      if(element.employeeId==emplId){
        element.days.push(pair.col)
        found = true
    }});
      if (!found){
        tempAlter = new AlterDataSet(emplId)
        tempAlter.days.push(pair.col)
        this.workersA.push(tempAlter)
      }
      found = false;
      this.workersA.forEach(element => {
        console.log(element)
      });
    })

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
