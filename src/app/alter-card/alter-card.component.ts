import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDataService } from '../app-data.service';
import { Cause } from '../cause';
import { DayCard } from '../day-card';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

interface worker{firstName:string};

@Component({
  selector: 'app-alter-card',
  templateUrl: './alter-card.component.html',
  styleUrls: ['./alter-card.component.css']
})
export class AlterCardComponent implements OnInit {
  causes:Cause[]
  workers:worker[];
  daycards:DayCard[];
  newCardForAll:DayCard;
  times:string[]


  constructor(private appDataService:AppDataService, private router:Router) { }

  ngOnInit(): void {
    this.makeTimes();
    this.workers.push({firstName:'John'});
    this.workers.push({firstName:'Ben'});
    this.workers.push({firstName:'Gale'});
    this.causes=this.appDataService.allCauses;
    this.appDataService.causesdata.subscribe((ch)=>{
      this.causes=this.appDataService.allCauses;
    }
    )
  }

  makeTimes(){
    for (let indexH = 0; indexH < 25; indexH++) {
      for (let indexM = 0; indexM < 65; indexM+=15) {
        this.times.push('' + indexH + ':' + indexM + ':00')
      }
    }
  }

  onSubmit(form:NgForm){
    
  }

  dismis(){
    this.router.navigate(['/schedule'])
  }

}
