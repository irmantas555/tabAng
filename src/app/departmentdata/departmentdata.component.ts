import { Component, OnInit } from '@angular/core';
import { DepartmentDto } from '../department-dto';
import { AppDataService } from '../services/app-data.service';
import {Department} from '../department';
import {Country} from '../country';

@Component({
  selector: 'app-departmentdata',
  templateUrl: './departmentdata.component.html',
  styleUrls: ['./departmentdata.component.css']
})
export class DepartmentdataComponent implements OnInit {
  department: Department = new Department();
  depts: Department[]= this.dataserv.allDepartments;
  countries: Country[] = this.dataserv.allCountries;
  defaultCountry: Country = new Country();



  constructor(private dataserv: AppDataService) { }

  ngOnInit(): void {
    this.defaultCountry =  this.dataserv.allCountries[0];
  }

  compareFn(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  sendDept(){
    // let id: number;
    // const tmpDep: Department = {deptId: null, name: this.department.name, country: this.defaultCountry.id};
    this.department.country = this.defaultCountry.id
    this.dataserv.postDepartment(this.department);
  }
}
