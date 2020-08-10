import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rowpp',
  templateUrl: './rowpp.component.html',
  styleUrls: ['./rowpp.component.css']
})
export class RowppComponent implements OnInit {
  monthdays:number = 31;
  days:string[]=[];

  constructor() { }

  ngOnInit(): void {
    this.daysstrings()
  }

  daysstrings(){
    for (var i = 1 ; i<31; i++){
      this.days.push(i.toString())
    }
    // console.log(this.days.length)
  };
}
