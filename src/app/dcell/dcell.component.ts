import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DayCard } from '../day-card';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ScheduleService } from '../schedule.service';
import {RowDirectiveDirective} from '../row-directive.directive'

@Component({
  selector: 'app-dcell',
  templateUrl: './dcell.component.html',
  styleUrls: ['./dcell.component.css']
})
export class DcellComponent implements OnInit {
  @Input() cellDayCard:DayCard;
  celine:boolean=true;
  constructor(private scheduleService:ScheduleService, private elementRef:ElementRef) {
    
  }

  ngOnInit(): void {
          //cell select overlay section
      this.scheduleService.celineStatus.subscribe((next)=>{
        this.celine=next;
      })
      this.scheduleService.celineStatus.subscribe((status)=>{
        console.log(status)
        this.celine=status;
      })
  }

  getInfo(){
    this.scheduleService.colsSub.next(this.elementRef.nativeElement.getAttribute('data-col-index'))
  };

}
