import { Component, OnInit } from '@angular/core';
import { DepartmentDto } from '../department-dto';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-departmentdata',
  templateUrl: './departmentdata.component.html',
  styleUrls: ['./departmentdata.component.css']
})
export class DepartmentdataComponent implements OnInit {
  department:DepartmentDto = new DepartmentDto;
  departmentlisted:string='';
  depts:string[]=[];
  haveDept:boolean = false;


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getDtoDepartments();
    this.dataserv.departmentdtodata.subscribe((nextdept) =>{
      this.depts.push(nextdept);
      this.haveDept = true;
    })
  }

  sendDept(){
   console.log('started country = ' + this.department)
   this.dataserv.postDepartment(this.department)

  }
}
