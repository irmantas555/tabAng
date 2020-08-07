import { Component, OnInit } from '@angular/core';
import { ClipboardService } from '../clipboard.service';
import { Employee } from '../employee';
import { AppServiceService } from '../app-service.service';
import { env } from 'process';

@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css'],
})
export class EmployeedataComponent implements OnInit {
  texta: string = '';
  rows: string[];
  employees: Employee[]=[];
  tempEmp: Employee;
  tarr: string[];

  constructor(private cserv: ClipboardService,private app:AppServiceService) {}

  ngOnInit(): void {}

  textArea(evntt){
    this.texta = evntt.target.value;
    this.copy();
  }


  copy() {
    this.rows = this.texta.split('\n');
    this.rows.forEach((element) => {
      this.tarr = element.split('\t');
      this.tempEmp = {
        firstName: this.tarr[0],
        lasttName: this.tarr[1],
        birthDate: new Date(this.tarr[2]),
        email: this.tarr[3],
        jobEnd: new Date(this.tarr[4]),
        jobStart: new Date(this.tarr[5]),
        phone: this.tarr[6],
        photo: this.tarr[7],
      };
      console.log(this.tempEmp)
      this.employees.push(this.tempEmp);
    });
    this.app.postEmployee(this.employees);
  }
}
