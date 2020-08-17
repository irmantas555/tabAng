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
  employHistData:EmplHistOb[]=[];
  constructor(private http:HttpClient) { }

  ngOnInit(){
  };

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
