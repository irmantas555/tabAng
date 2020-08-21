import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { CalendarDate } from '../calendar-date';

@Component({
  selector: 'app-rowpp',
  templateUrl: './rowpp.component.html',
  styleUrls: ['./rowpp.component.css']
})
export class RowppComponent implements OnInit {
  monthdays: number;
  days: CalendarDate[];

  constructor(private ScheduleDateServ: ScheduleService) { }

  ngOnInit(): void {
    this.monthdays = this.ScheduleDateServ.daysInThisMonth;
    this.days = this.ScheduleDateServ.thisMonthCalendar;
    this.ScheduleDateServ.dateChange.subscribe((ch) => {
      this.monthdays = this.ScheduleDateServ.daysInThisMonth;
      this.days = this.ScheduleDateServ.thisMonthCalendar;
      // console.log('Now days ' + this.days.length)
    });
  }




}
