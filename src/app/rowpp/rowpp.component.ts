import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { CalendarDate } from '../calendar-date';

@Component({
  selector: 'app-rowpp',
  templateUrl: './rowpp.component.html',
  styleUrls: ['./rowpp.component.css']
})
export class RowppComponent implements OnInit {
  monthdays:number;
  days:CalendarDate[];

  constructor(private dateServ:ScheduleService) { }

  ngOnInit(): void {
    this.monthdays=this.dateServ.daysInThisMonth;
    this.days=this.dateServ.thisMonthCalendar;
    this.dateServ.dateChange.subscribe((ch)=>{
      this.monthdays=this.dateServ.daysInThisMonth;
      this.days=this.dateServ.thisMonthCalendar;
      console.log('Now days ' + this.days.length)
    })
  };


  

}
