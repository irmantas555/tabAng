import { Component, OnInit, Input } from '@angular/core';
import { DayCard } from '../day-card';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ScheduleService } from '../schedule.service';
import { RowCol } from '../row-col';
import {take, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-dcell',
  templateUrl: './dcell.component.html',
  styleUrls: ['./dcell.component.css'],
})
export class DcellComponent implements OnInit {
  @Input() cellDayCard: DayCard;
  celine = false;
  @Input() currow: number;
  constructor(
    private scheduleService: ScheduleService,
  ) {}

  ngOnInit(): void {
  }

  mouseenter() {
    if (this.scheduleService.mouseDProperty === true) {
      this.scheduleService.colsRowsSub.next(
        new RowCol(this.currow, this.cellDayCard.day)
      );
      this.celine = true;
      this.addCelineListener();
      this.addDCardListener();
    }
  }

  addCelineListener() {
    this.scheduleService.celineStatus.pipe(
      takeWhile(status => status === true)
    ).subscribe((status) => {
    },
    (err) => console.log(err),
    () => {
      // console.log('usubscribed');
      this.celine = false;
    });

  }

  addDCardListener(){
    let id = 0;
    this.scheduleService.dCardChange.pipe(take(1)).subscribe((status) => {
      if (status === true){
       id = this.cellDayCard.employeeId;
       this.cellDayCard = this.scheduleService.newCardValue;
       this.cellDayCard.employeeId = id;
      }
    });
  }

}
