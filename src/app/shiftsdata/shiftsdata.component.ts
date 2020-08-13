import { Component, OnInit } from '@angular/core';
import { Shift } from '../shift';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-shiftsdata',
  templateUrl: './shiftsdata.component.html',
  styleUrls: ['./shiftsdata.component.css']
})
export class ShiftsdataComponent implements OnInit {
  shift:Shift = new Shift;
  shiftlisted:string='';
  shifts:string[]=[];
  haveShift:boolean = false;


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getShifts();
    this.dataserv.shifttdata.subscribe((nextdept)=>{
      this.shifts.push(nextdept);
      this.haveShift = true;
    })
  }

  sendDept(){
   console.log('started country = ' + this.shift) 
   this.dataserv.postShift(this.shift)
  }

}
