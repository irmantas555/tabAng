import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-departmentdata',
  templateUrl: './departmentdata.component.html',
  styleUrls: ['./departmentdata.component.css']
})
export class DepartmentdataComponent implements OnInit {
  department:Department = new Department;
  departmentlisted:string='';
  depts:string[]=[];
  haveDept:boolean = false;


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getDepartments();
    this.dataserv.departmentdata.subscribe((nextdept)=>{
      this.depts.push(nextdept);
      this.haveDept = true;
    })
  }

  sendDept(){
   console.log('started country = ' + this.department) 
   this.dataserv.postDepartment(this.department)
  
  }
}
