import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-causesdata',
  templateUrl: './causesdata.component.html',
  styleUrls: ['./causesdata.component.css']
})
export class CausesdataComponent implements OnInit {
  cause:string;
  constructor() { }

  ngOnInit(): void {
  }

  enterCause(form:NgForm){
    console.log(form)
  }

}
