import { Component, OnInit } from '@angular/core';
import { ShiftDto } from '../shift-dto';
import { AppDataService } from '../services/app-data.service';
import {Shift} from "../shift";
import {Department} from "../department";
import {Time} from "@angular/common";

@Component({
  selector: 'app-shiftsdata',
  templateUrl: './shiftsdata.component.html',
  styleUrls: ['./shiftsdata.component.css']
})
export class ShiftsdataComponent implements OnInit {
  shift:Shift = new Shift();
  shiftlist:Shift[]=[];
  deptslist:Department[]=[];
  defaultDept:Department = new Department();
  times:string[]=[];



  constructor(private appdataservice:AppDataService) { }

  ngOnInit(): void {
    this.shiftlist = this.appdataservice.allShifts.filter((shif)=>{
      shif.deptNumber = this.defaultDept.id
    });

    this.deptslist = this.appdataservice.allDepartments
    this.times=this.appdataservice.times;
    this.shift.endTime = '17:00:00';
    this.shift.startTime = '8:00:00';
  }

  compareFn(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onDepCange(){
    this.shiftlist = this.appdataservice.allShifts.filter((shif)=>{
      shif.deptNumber = this.defaultDept.id
    });
  };

  sendDept(){
    this.shift.deptNumber = this.defaultDept.id
   console.log('started country dep = ' + this.shift.deptNumber)
   this.appdataservice.postShift(this.shift)
  }

}
