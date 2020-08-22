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
  department: DepartmentDto = new DepartmentDto();
  departmentlisted = '';
  depts: string[] = [];
  haveDept = false;


  constructor(private dataserv: AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getDtoDepartments();
    this.dataserv.departmentdtodata.subscribe((nextdept) => {
      this.depts.push(nextdept);
      this.haveDept = true;
      this.department.country = 'Lietuva';
      this.department.name = '';
    });
  }

  sendDept(){
    let id: number;
    this.dataserv.allCountries.forEach((countr) => {
    if (countr.name === this.department.country) {
      id = countr.id;
    }
    }
    );
    const tmpDep: Department = {deptId: null, name: this.department.name, country: id};
    this.dataserv.postDepartment(tmpDep);

  }
}
