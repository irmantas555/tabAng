import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeObj } from '../employee-obj';
import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import { timeout, map } from 'rxjs/operators';
import { CalendarDate } from '../calendar-date';
import { RowCol } from '../row-col';
import {DayCard} from '../day-card';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  thisMonthCalendar: CalendarDate[] = [];
  menesiai: string[] = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužis', 'Birželis', 'Liepa', 'Rūgpjūtis', 'Rūgsėjis', 'Spalis', 'Lapkritis', 'Gruodis' ];

  constructor(private http: HttpClient) {}
  today: Date;
  currentYear: number;
  currentMonth: number;
  dateChange = new Subject<boolean>();
  celineStatus = new Subject<boolean>();
  colsRowsSub = new Subject<RowCol>();
  dCardChange = new Subject<number>();
  mouseDProperty = false;
  newCardValue: DayCard;

  daysInThisMonth: number;
  weekDayOf1MDay: number;

  init() {
    console.log('shedule service init');
    this.today = new Date();
    this.currentYear = this.today .getFullYear();
    this.currentMonth = this.today.getMonth();
    this.getDaysInMonth();
    this.getFirstWeekDay();
    this.fillCalendar();
  }


  fillCalendar() {
    let empCCard: CalendarDate;
    this.thisMonthCalendar = [];
    for (let i = 1; i <= this.daysInThisMonth; i++) {
      empCCard = new CalendarDate();
      empCCard.day = i;
      empCCard.month = this.currentMonth;
      empCCard.year = this.currentYear;
      empCCard.weekday = (this.weekDayOf1MDay + i - 1) % 7;
      this.thisMonthCalendar.push(empCCard);
    }
  }

  newDateData(newDate: Date) {
    this.today = newDate;
    // console.log('Now ' + this.today.toDateString());
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.getDaysInMonth();
    this.getFirstWeekDay();
    this.fillCalendar();
    this.dateChange.next(true);
  }

  getDaysInMonth() {
    this.daysInThisMonth = new Date(
      this.currentYear,
      this.currentMonth,
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
