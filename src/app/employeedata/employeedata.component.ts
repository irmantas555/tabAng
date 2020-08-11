import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { AppServiceService } from '../app-service.service';
import { DatePipe  } from '@angular/common'


@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css'],
})
export class EmployeedataComponent implements OnInit {
  texta: string;
  rows: string[];
  employees: Employee[]=[];
  tempEmp: Employee;
  tarr: string[];

  constructor(private app:AppServiceService,private datePipe:DatePipe) {}

  ngOnInit(): void {}

  textArea(evntt){
    this.texta = evntt.target.value;
    this.copy();
  }


  copy() {
    this.employees=[];
    console.log(this.texta)
    this.rows = this.texta.split('\n');
    console.log('so much rows - ' + this.rows.length)
    this.rows.forEach((element) => {
      this.tarr = element.split('\t');
      this.tempEmp = {
        firstName: this.tarr[0],
        lasttName: this.tarr[1],
        birthDate: this.datePipe.transform(Date.parse(this.tarr[2]),'yyyy-MM-dd'),
        email: this.tarr[3],
        jobEnd: this.datePipe.transform(Date.parse(this.tarr[4]),'yyyy-MM-dd'),
        jobStart: this.datePipe.transform(Date.parse(this.tarr[5]),'yyyy-MM-dd'),
        phone: this.tarr[6],
        photo: this.tarr[7],
        position: this.tarr[8],
        payment: Number.parseInt(this.tarr[9]),
        department: this.tarr[10],
        shift:Number.parseInt(this.tarr[11]),
      };
      console.log(this.tempEmp)
      this.employees.push(this.tempEmp);
    });
    console.log('There are ' + this.employees.length + 'el;emets in array added')
    this.app.postEmployee(this.employees);
  }

}
