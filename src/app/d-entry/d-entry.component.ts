import {Component, OnInit} from '@angular/core';
import {Empl} from '../empl';
import {EmplPersData} from '../empl-pers-data';
import {EmplJobData} from '../empl-job-data';
import {Department} from '../department';
import {Shift} from '../shift';
import {Payment} from '../payment';
import {AppDataService} from '../services/app-data.service';
import {Position} from '../position';
import {delay, timeout} from 'rxjs/operators';
import {from, pipe} from 'rxjs';

@Component({
  selector: 'app-d-entry',
  templateUrl: './d-entry.component.html',
  styleUrls: ['./d-entry.component.css']
})
export class DEntryComponent implements OnInit {
  empl: Empl = new Empl();
  employees: Empl[] = [];
  emplPersData: EmplPersData = new EmplPersData();
  emplJData: EmplJobData = new EmplJobData();
  pos: Position = new Position();
  positions: Position[] = [];
  depts: Department[] = [];
  dept: Department = new Department();
  shifts: Shift[] = [];
  shift: Shift = new Shift();
  paym: Payment = new Payment();
  show = false;

  constructor(private appDataService: AppDataService) {
  }

  ngOnInit(): void {
    this.someTimeOut().pipe(
      delay(1000)

    ).subscribe((v) => {
      this.show = true;
      this.positions = this.appDataService.allPositions;
      this.depts = this.appDataService.allDepartments;
      this.employees = this.appDataService.allEmployees;
      this.shifts = this.appDataService.allShifts;
      this.dept = this.depts[0];
      this.pos = this.positions[0];
      this.fillterShifts();
      this.shift = this.shifts[0];
    });

  }
  fillterShifts() {
    // console.log('teher are so much shits: ' + this.shifts.length + ' and dept id is ' + this.dept.id);
    this.shifts = this.appDataService.allShifts.filter((shi) => {
      return shi.deptNumber === this.dept.id;
    });
  }

  someTimeOut(){
   return from('timeout');
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  sendEmp() {
    let newId;
    this.appDataService.postEmployee(this.empl);
    this.appDataService.employeedata.subscribe((emp) => {
      newId = emp.id;
    }, error => console.log(error));
    this.emplPersData.employeeId = newId;
    this.emplJData.employeeId = newId;
    this.paym.employeeId = newId;
    // console.log(this.paym);
    this.emplJData.departmentId = this.dept.id;
    this.emplJData.position = this.pos.id;
    this.emplJData.shift = this.shift.id;
    this.appDataService.postEmployeePD(this.emplPersData);
    this.appDataService.postEmployeeJD(this.emplJData);
    this.appDataService.postPayment(this.paym);
  }
}
