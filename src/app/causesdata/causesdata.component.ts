import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AppDataService } from '../app-data.service';
import { from } from 'rxjs';
import { CauseObject } from '../cause-object';

@Component({
  selector: 'app-causesdata',
  templateUrl: './causesdata.component.html',
  styleUrls: ['./causesdata.component.css']
})
export class CausesdataComponent implements OnInit {
  cause:CauseObject = new CauseObject;
  causeSymb:string='';
  resp:string[]=[];


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getCauses();
    this.dataserv.causesdata.subscribe((nextcause)=>{
      console.log('received causes' + nextcause)
      this.resp.push(nextcause);
    })
  }

  sendCause(){
   console.log('started couse = ' + this.cause) 
   this.dataserv.postCause(this.cause)
  
  }

}
