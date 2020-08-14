import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeObj } from './employee-obj';
import { Subject, of, Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements OnInit{

  constructor(private http: HttpClient) { }
  today = new Subject<Date>();
  currentYear:number;
  currentMonth:number;
  daysInThisMonth = new Subject<number>();
  weekDayOf1MDay= new Subject<number>();

ngOnInit(){
  this.today.next(new Date());
  this.today.subscribe((date)=>{
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
  });
  this.getDaysInMonth();
  this.getFirstWeekDay();
};

newDateData(newDate:Date){
  this.today.next(newDate);
  this.today.subscribe((date)=>{
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
  });
  this.getDaysInMonth();
  this.getFirstWeekDay();
}


getDaysInMonth() {
 this.daysInThisMonth.next((new Date(this.currentYear, this.currentMonth, 0)).getDate());
};

getFirstWeekDay(){
  this.weekDayOf1MDay.next((new Date(this.currentYear, this.currentMonth, 0)).getDay());
 };



}
