import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeObj } from './employee-obj';
import { EmplHistOb } from './empl-hist-ob';
import { Empl } from './empl';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class ScheduleHhtpService implements OnInit {
  employeedata:Empl[]=[];
  employHistData:EmplHistOb[]=[];
  datesObj

  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.loadEmployees();
  };

  loadEmployees() {
    this.http
      .get('http://localhost:8080/employees')
      .subscribe((response: Empl[]) => {
        response.forEach((element) => {
          this.employeedata.push(element);
        });
      });
  }

  loadEmployeesHist() {
    this.http
      .get('http://localhost:8080/employees/hist')
      .subscribe((response: EmplHistOb[]) => {
        response.forEach((element) => {
          this.employHistData.push(element);
        });
      });
  }


  
}
