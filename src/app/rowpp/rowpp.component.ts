import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-rowpp',
  templateUrl: './rowpp.component.html',
  styleUrls: ['./rowpp.component.css']
})
export class RowppComponent implements OnInit {
  monthdays:number;
  days:string[]=[];

  constructor(private dateServ:ScheduleService) { }

  ngOnInit(): void {
    this.daysstrings()
    this.dateServ.daysInThisMonth.subscribe((daysQty)=>{
      this.monthdays=daysQty;
    });


  }

  daysstrings(){
    for (var i = 1 ; i<31; i++){
      this.days.push(i.toString())
    }
    // console.log(this.days.length)
  };
}
