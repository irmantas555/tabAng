import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DayCard } from '../day-card';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-dcell',
  templateUrl: './dcell.component.html',
  styleUrls: ['./dcell.component.css']
})
export class DcellComponent implements OnInit {
  @Input() cellDayCard:DayCard;
  @Input() row:number;
  celine:boolean=false;
  constructor(private scheduleService:ScheduleService, private el:ElementRef) {
    
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

  // getInfo(){
  //   console.log(this.elementRef.nativeElement.getAttribute('data-col-index'))
  //   // this.scheduleService.colsSub.next(this.elementRef.nativeElement)
  // };

  // getInfoTwo(){
  //   // this.scheduleService.colsSub.next(this.elementRef.nativeElement)
  // };

  mouseDown(){
    if(this.scheduleService.mouseDProperty==false){
      this.scheduleService.colsRowsSub.next({row:this.row,col:this.cellDayCard.day})
    }
  }
  mouseenter(){
    if(this.scheduleService.mouseDProperty==true){
      this.scheduleService.colsRowsSub.next({row:this.row,col:this.cellDayCard.day})
    }

  }
  mouseup(){
    if(this.scheduleService.mouseDProperty==true){
      this.scheduleService.mouseDProperty=false;
    }

  }


}
