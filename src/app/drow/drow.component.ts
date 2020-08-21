import {Component, OnInit, Input, Output, ElementRef} from '@angular/core';
import {CalendarDate} from '../calendar-date';
import {ScheduleService} from '../schedule.service';
import {AppDataService} from '../app-data.service';
import {DayCard} from '../day-card';
import {JoinedCard} from '../joined-card';


@Component({
  selector: 'app-drow',
  templateUrl: './drow.component.html',
  styleUrls: ['./drow.component.css'],
})
export class DrowComponent implements OnInit {
  @Input() allDaysInmonth: CalendarDate[];
  @Input() rowjoinedcard: JoinedCard;
  @Input() rowrow: number;
  updatedCards: DayCard[] = [];


  constructor(
    private scheduleDateServ: ScheduleService,
    private dataService: AppDataService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.addmissingcards();
    // this.allDaysInmonth = this.scheduleDateServ.thisMonthCalendar;
    // this.scheduleDateServ.dateChange.subscribe((change) =>{
    //   this.allDaysInmonth = this.scheduleDateServ.thisMonthCalendar;
  }

  addmissingcards() {
    let pushed = false;
    for (let index = 1; index < this.allDaysInmonth.length + 1; index++) {
      pushed = false;
      this.rowjoinedcard.t2.forEach((element: DayCard) => {
        if (pushed === false) {
          if (element.day === index) {
            this.dataService.allCauses.forEach((cause) => {
                if (cause.id === element.cause) {
                  element.causeStr = cause.cause;
                  element.causeCod = cause.cod;
                }
              }
            );
            // console.log(element);
            this.updatedCards.push(element);
            pushed = true;
          }
        }
      });
      if (pushed === false) {
        const tempCard = new DayCard();
        tempCard.day = index;
        tempCard.causeCod = '';
        tempCard.employeeId = this.rowjoinedcard.t1.employeeId;
        this.updatedCards.push(tempCard);
      }
    }
  }


}
