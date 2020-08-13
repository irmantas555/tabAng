import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeObj } from './employee-obj';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements OnInit{

  constructor(private http: HttpClient) { }
  employeedata:EmployeeObj[]=[];

ngOnInit(){
  this.loadEmployees();
};

loadEmployees() {
  this.http
    .get('http://localhost:8080/employees/all')
    .subscribe((response: EmployeeObj[]) => {
      response.forEach((element) => {
        this.employeedata.push(element);
      });
    });
}

loadEmployeesHistory(){
      
}


}
