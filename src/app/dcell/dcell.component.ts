import {Component, OnInit, Input} from '@angular/core';
import {DayCard} from '../day-card';
import {ScheduleComponent} from '../schedule/schedule.component';
import {ScheduleService} from '../services/schedule.service';
import {RowCol} from '../row-col';
import {filter, map, take, takeWhile, tap, zip, zipAll} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dcell',
  templateUrl: './dcell.component.html',
  styleUrls: ['./dcell.component.css'],
})
export class DcellComponent implements OnInit {
  @Input() cellDayCard: DayCard;
  celine = false;
  @Input() currow: number;
  @Input() weekend: boolean;

  constructor(
    private scheduleService: ScheduleService,
  ) {
  }

  ngOnInit(): void {
    const weekday: number = Math.round((this.scheduleService.weekDayOf1MDay + this.cellDayCard.day - 1) % 7);
    this.weekend = (weekday === 0 || weekday === 6);
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
        // console.log('usubscribed celine');
        this.celine = false;
        // this.scheduleService.celineStatus.unsubscribe();
      });
  }

  addDCardListener() {
    const id = this.cellDayCard.id;
    const day = this.cellDayCard.day;
    const empId = this.cellDayCard.employeeId;
    this.scheduleService.dCardChange.pipe(
      take(1))
      .subscribe((status) => {
          if (status === 1) {
            this.checkNewNames();
            this.cellDayCard = this.scheduleService.newCardValue;
            this.cellDayCard.day = day;
          } else if (status === 2) {
            this.cellDayCard.cause = null;
            this.cellDayCard.id = null;
            this.cellDayCard.startTime = null;
            this.cellDayCard.endTime = null;
            this.cellDayCard.causeStr = null;
            this.cellDayCard.causeCod = '';
            this.cellDayCard.extraTime = null;
          }
        },
        error => console.log(error),
        () => {
          // this.scheduleService.dCardChange.unsubscribe();
          // this.scheduleService.newCardWithId.unsubscribe();
          // console.log('usubscribed dcard change ' + day);

        });
  }
  checkNewNames(){
    if (this.cellDayCard.id === null  || this.cellDayCard.id === undefined) {
      // let iddd;
      // console.log('Proceding with new names');
      const day = this.cellDayCard.day;
      const empId = this.cellDayCard.employeeId;
      this.scheduleService.newCardWithId.pipe(
        // tap(v => console.log('looking for value ' + v)),
        filter(dacard => dacard.date.getDate() === day),
        filter(dc => dc.employeeId === empId),
        map(dc => dc.id),
        // map(v => {
        //   console.log('retrieving id ' + JSON.stringify(v));
        //   return v;
        // }),
        take(1))
        .subscribe(value => this.cellDayCard.id = value);
        // map(value => iddd = value));
    }
  }


}
