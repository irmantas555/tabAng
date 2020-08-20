import { Component, OnInit } from '@angular/core';
import { ShiftDto } from '../shift-dto';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-shiftsdata',
  templateUrl: './shiftsdata.component.html',
  styleUrls: ['./shiftsdata.component.css']
})
export class ShiftsdataComponent implements OnInit {
  depts:string[];
  shift:ShiftDto = new ShiftDto;
  shiftlisted:string='';
  shifts:string[]=[];
  haveShift:boolean = false;


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getDtoShifts();
    this.dataserv.shiftdata.subscribe((nextdept) =>{
      this.shifts.push('' + nextdept.shiftNumber + ' ' + + nextdept.department + ' ' + nextdept.startTime +
       ' ' + nextdept.endTime + nextdept.timeOutMinutes );
      this.haveShift = true;
    })
  }

  sendDept(){
   console.log('started country = ' + this.shift)
   this.dataserv.postShift(this.shift)
  }

}
