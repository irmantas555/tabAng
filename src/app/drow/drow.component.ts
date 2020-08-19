import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { CalendarDate } from '../calendar-date';
import { ScheduleService } from '../schedule.service';
import { Empl } from '../empl';
import { AppDataService } from '../app-data.service';
import { MonthCard } from '../moth-card';
import { DayCard } from '../day-card';
import { Observable, pipe, from, merge, of, Subject } from 'rxjs';
import {
  filter,
  map,
  groupBy,
  toArray,
  mergeMap,
  reduce,
} from 'rxjs/operators';
import { JoinedCard } from '../joined-card';
import {RowDirectiveDirective} from '../row-directive.directive'

@Component({
  selector: 'app-drow',
  templateUrl: './drow.component.html',
  styleUrls: ['./drow.component.css'],
})
export class DrowComponent implements OnInit {
  @Input() allDaysInmonth: CalendarDate[];
  @Input() rowjoinedcard: JoinedCard;
  updatedCards: DayCard[] = [];


  constructor(
    private scheduleDateServ: ScheduleService,
    private dataService: AppDataService,
    private elementRef:ElementRef
  ) {}

  ngOnInit(): void {
    this.addmissingcards();
    // this.allDaysInmonth = this.scheduleDateServ.thisMonthCalendar;
    // this.scheduleDateServ.dateChange.subscribe((change)=>{
    //   this.allDaysInmonth = this.scheduleDateServ.thisMonthCalendar;
  }
  addmissingcards() {
    let pushed: boolean = false;
    for (let index = 1; index < this.allDaysInmonth.length + 1; index++) {
      pushed = false;
      this.rowjoinedcard.t2.forEach((element: DayCard) => {
        if (pushed == false) {
          if (element.day == index) {
            this.updatedCards.push(element);
            this.dataService.allCauses.forEach((cause)=>
            {
              if(cause.id == element.cause){
                element.causeStr = cause.cause;
                element.causeCod = cause.cod;
              }
            }
            )
            pushed = true;
          }
        }
      });
      if (pushed == false) {
        let tempCard = new DayCard();
        tempCard.day = index;
        tempCard.causeCod = '';
        tempCard.employeeId = this.rowjoinedcard.t1.employeeId;
        this.updatedCards.push(tempCard);
      }
    }
  }

  // onrowclick(){
  //   console.log('row clicked')
  //   this.scheduleDateServ.rowsSub.next(this.elementRef.nativeElement.getAttribute('data-row-index'))
  // }

}
