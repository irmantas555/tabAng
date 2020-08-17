import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeObj } from './employee-obj';
import { Subject, of, Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';
import { CalendarDate } from './calendar-date';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService implements OnInit {
  thisMonthCalendar: CalendarDate[] = [];

  constructor(private http: HttpClient) {}
  today: Date;
  currentYear: number;
  currentMonth: number;
  dateChange = new Subject<boolean>();

  daysInThisMonth: number;
  weekDayOf1MDay: number;

  init() {
    this.today = new Date();
    this.currentYear = this.today .getFullYear();
    this.currentMonth = this.today.getMonth();
    this.getDaysInMonth();
    this.getFirstWeekDay();
    this.fillCalendar();
  }

  ngOnInit() {}

  fillCalendar() {
    let empCCard: CalendarDate;
    this.thisMonthCalendar = [];
    for (let i = 1; i <= this.daysInThisMonth; i++) {
      empCCard = new CalendarDate();
      empCCard.day = i;
      empCCard.month = this.currentMonth;
      empCCard.year = this.currentYear;
      empCCard.weekday = this.weekDayOf1MDay + (i % 7);
      this.thisMonthCalendar.push(empCCard);
    }
  }

  newDateData(newDate: Date) {
    this.today = newDate;
    console.log('Now ' + this.today.toDateString())
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.getDaysInMonth();
    this.getFirstWeekDay();
    console.log('first weekday ' + this.weekDayOf1MDay)
    this.fillCalendar();
    this.dateChange.next(true);
  }

  getDaysInMonth() {
    this.daysInThisMonth = new Date(
      this.currentYear,
      this.currentMonth +1,
      0
    ).getDate();
  }

  getFirstWeekDay() {
    this.weekDayOf1MDay = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
  }
}
