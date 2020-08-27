import {Component, OnInit, ElementRef } from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {ScheduleHhtpService} from '../services/schedule-http.service';
import {ChangeDetectorRef} from '@angular/core';
import {Cause} from '../cause';
import {DayCard} from '../day-card';
import {AppDataService} from '../services/app-data.service';
import {CalendarDate} from '../calendar-date';
import {JoinedCard} from '../joined-card';
import {Router} from '@angular/router';
import {AlterDataSet} from '../alter-data-set';
import {DateOb} from '../date-ob';
import {FormControl} from '@angular/forms';
import {RowCol} from '../row-col';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
  emlpCards: JoinedCard[] = [];
  thisMonthDates: CalendarDate[] = [];
  today: Date = this.scheduleServ.today;
  currentYear: number = this.scheduleServ.currentYear;
  currentMonth: number = this.scheduleServ.currentMonth;
  menes: string[];
  daysInMonth: number;
  firstMonthDayWeekday: number;

  modal = false;
  causes: Cause[] = [];
  times: string[] = [];
  workersA: AlterDataSet[] = [];
  causeObject: Cause = new Cause();
  alterDates: DateOb[] = [];
  datesIdsToDelete: number[] = [];
  startToAlter;
  endToAlter;
  duraToAlter;
  rowColArray: RowCol[] = [];

  selectedCausesControl = new FormControl();

  constructor(private scheduleServ: ScheduleService, private scheduleHttp: ScheduleHhtpService,
              private chDetect: ChangeDetectorRef, private appdataservice: AppDataService,
              private router: Router, private el: ElementRef) {
  }

  ngOnInit(): void {
    // calendar section
    this.today = this.scheduleServ.today;
    this.currentYear = this.scheduleServ.currentYear;
    this.currentMonth = this.scheduleServ.currentMonth;
    this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
    this.menes = this.scheduleServ.menesiai;
    this.scheduleServ.dateChange.subscribe((ch) => {
      this.today = this.scheduleServ.today;
      this.currentYear = this.scheduleServ.currentYear;
      this.currentMonth = this.scheduleServ.currentMonth;
      this.thisMonthDates = this.scheduleServ.thisMonthCalendar;
      this.emlpCards = this.scheduleHttp.emplMonthCards;
    });
    this.emlpCards = this.scheduleHttp.emplMonthCards;
    this.causes = this.appdataservice.allCauses;
    this.causeObject = this.appdataservice.allCauses[0];
    this.enterDates();
    this.times = this.appdataservice.times;
    this.startToAlter = ('8:00:00');
    this.endToAlter = ('17:00:00');
  }

  nextMonth() {
    this.scheduleServ.today.setMonth(this.today.getMonth() + 1);
    this.scheduleHttp.emplMonthCards = [];
    this.scheduleServ.newDateData(this.today);
  }

  prevMonth() {
    this.scheduleServ.today.setMonth(this.today.getMonth() - 1);
    this.scheduleHttp.emplMonthCards = [];
    this.scheduleServ.newDateData(this.today);
  }


  onClick() {
    this.newCauses();
    this.alterDates = [];
    this.scheduleServ.dCardChange.next(1);
    document.getSelection().removeAllRanges();
    this.modal = false;
  }

  onRetreat() {
    this.rowColArray = [];
    this.modal = false;
    this.alterDates = [];
    document.getSelection().removeAllRanges();
    this.scheduleServ.dCardChange.next(0);
  }

  onDelete() {
    this.newDeletes();
    this.alterDates = [];
    this.scheduleServ.dCardChange.next(2);
    document.getSelection().removeAllRanges();
    this.modal = false;
  }

  removeWorker(val: any) {
    this.workersA.splice(val.currentTarget.closest('li').value, 1);
  }

  trackById(index: number, worker: any) {
    if (!worker) {
      return null;
    }
    // console.log('w ' + index + 'i ' + worker);
    return worker.id;
  }

  enterDates() {
    this.scheduleServ.colsRowsSub.subscribe((pair) => {
      if (pair.row === null) {
        return;
      } else {
        this.rowColArray.push(pair);
      }
    });
  }

  mousedown() {
    if (this.scheduleServ.mouseDProperty === false) {
      this.scheduleServ.mouseDProperty = true;
      this.workersA = [];
    }
  }

  mouseup() {
    // console.log('mouseup fired');
    if (this.scheduleServ.mouseDProperty === true && this.rowColArray.length > 0 ) {
      this.scheduleServ.mouseDProperty = false;
      this.scheduleServ.celineStatus.next(false);
      this.modal = true;
    }
  }

  newCauses() {
    let ind;
    this.makeTempDCard();
    this.rowColArray.forEach((pair) => {
      const tempDate = new DateOb();
      this.emlpCards[pair.row].t2.forEach((dday, index) => {
        if (dday.day === pair.col) {
          tempDate.id = dday.id;
          ind = index;
        }
      });
      tempDate.employeeId = this.emlpCards[pair.row].t1.employeeId;
      tempDate.date = new Date(this.currentYear, this.currentMonth, pair.col, 4); // keiciam i iso kuris yra -3 val
      tempDate.cause = this.causeObject.id;
      tempDate.startTime = this.startToAlter;
      tempDate.duration = this.getTimeDiff(this.startToAlter, this.endToAlter);
      // console.log(tempDate);
      this.scheduleHttp.sendCard(tempDate);
      this.scheduleServ.newCardWithId
        .pipe(
          filter(v => v.date.getDate() === pair.col ),
          filter(v => v.employeeId === tempDate.employeeId ),
            take(1)
        )
        .subscribe
      (value => {
        this.emlpCards[pair.row].t2[ind] = this.scheduleServ.newCardValue;
        this.emlpCards[pair.row].t2[ind].id = value.id;
      }, error => console.log(error));
      this.rowColArray = [];
    });
  }

  newDeletes() {
    let idd;
    let ddate;
    let eId;
    let datetosend;
    this.rowColArray.forEach((pair) => {
      // console.log('Pair ' + JSON.stringify(pair));
      idd = null;
      this.emlpCards[pair.row].t2.forEach((dday, index) => {
        if (dday.day === pair.col) {
          // console.log('found day' + dday.day + ' for empl: ' + this.emlpCards[pair.row].t1.firstName);
          idd = dday.id;
          ddate = new Date(this.currentYear, this.currentMonth, dday.day);
          datetosend = '' + ddate.getFullYear() + '-' + (ddate.getMonth() + 1) + '-' + ddate.getDate();
          // console.log(datetosend);
          eId = dday.employeeId;
          this.emlpCards[pair.row].t2.slice(index, 1);
        }
      });
      if (null !== idd) {
        // console.log('sending id' + idd + ' date ' + datetosend + ' empl id ' + eId);
        this.scheduleHttp.sendDeleteCard(idd, datetosend, eId);
      }
    });
    this.rowColArray = [];
  }

  getTimeDiff(start, end) {
    const startA: string[] = start.split(':');
    const endA: string[] = end.split(':');
    const startDate: Date = new Date(1950, 1, 1, Number(startA[0]), Number(startA[1]), Number(startA[2]));
    const endDate: Date = new Date(1950, 1, 1, Number(endA[0]), Number(endA[1]), Number(endA[2]));
    const nextDate: Date = new Date(1950, 1, 2, Number(endA[0]), Number(endA[1]), Number(endA[2]));
    // console.log(startDate);
    // console.log(startDate);
    let dura = 0;
    if (endDate.getTime() >= startDate.getTime()) {
      dura = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
    } else {
      dura = Math.round((nextDate.getTime() - startDate.getTime()) / 60000);
    }
    // console.log(dura);
    return dura;
  }

  makeTempDCard() {
    const tempDCard = new DayCard();
    tempDCard.cause = this.causeObject.id;
    tempDCard.startTime = this.startToAlter;
    // console.log(tempDCard.startTime);
    this.appdataservice.allCauses.forEach((cause) => {
      if (cause.id === tempDCard.cause) {
        tempDCard.causeStr = cause.cause;
        tempDCard.causeCod = cause.cod;
      }
    });
    this.scheduleServ.newCardValue = tempDCard;
  }
}
