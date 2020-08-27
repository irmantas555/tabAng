import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AppDataService } from '../services/app-data.service';
import { Cause } from '../cause';

@Component({
  selector: 'app-causesdata',
  templateUrl: './causesdata.component.html',
  styleUrls: ['./causesdata.component.css']
})
export class CausesdataComponent implements OnInit {
  cause:Cause = new Cause;
  causes: Cause[]=[];

  constructor(private dataserv:AppDataService) {}

  ngOnInit(): void {
    this.causes = this.dataserv.allCauses
  }

  sendCause(){
   // console.log('started couse = ' + this.cause)
   this.dataserv.postCause(this.cause)
  }

}
