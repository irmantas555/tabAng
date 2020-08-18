import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDataService } from '../app-data.service';
import { Cause } from '../cause';
import { DayCard } from '../day-card';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { worker } from 'cluster';
import Popper, { PopperOptions } from 'popper.js';
import { from } from 'rxjs';
class myworker {
  firstName: string;
  constructor(message: string) {
    this.firstName = message;
  }
}

@Component({
  selector: 'app-alter-card',
  templateUrl: './alter-card.component.html',
  styleUrls: ['./alter-card.component.css'],
})
export class AlterCardComponent implements OnInit {
  @Input() target: HTMLElement;
  // Its positioning (check docs for available options)
  @Input() placement?: string;
  // Optional hint target if you desire using other element than
  // specified one
  @Input() appPopper?: HTMLElement;
  causes: Cause[];
  workers: myworker[] = [];
  daycards: DayCard[] = [];
  newCardForAll: DayCard;
  times: string[] = [];
  private popper: Popper;
  private readonly defaultConfig: PopperOptions = {
    placement: 'top',
    removeOnDestroy: true
  };

  constructor(
    private appDataService: AppDataService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.el.nativeElement.addEventListener('click', ()=> {
    //   this.dismis();
    // })
    let tmpworker: myworker;
    this.makeTimes();

    this.workers.push(new myworker('John'));
    this.workers.push(new myworker('Ben'));
    this.workers.push(new myworker('Gale'));
    this.causes = this.appDataService.allCauses;
    this.appDataService.causesdata.subscribe((ch) => {
      this.causes = this.appDataService.allCauses;
    });
    const reference = this.appPopper ? this.appPopper : this.el.nativeElement;
    this.popper = new Popper(reference, this.target, this.defaultConfig);
  }

  makeTimes() {
    for (let indexH = 0; indexH < 25; indexH++) {

      for (let indexM = 0; indexM < 50; indexM += 15) {
        if (indexH == 0){
          this.times.push('' + indexH + ':' + '00'+ ':00');
        } else{
          this.times.push('' + indexH + ':' + indexM + ':00');
        }
      }
    }
  }

  onSubmit(form: NgForm) {}

  onClick() {
    this.causes.forEach((el) => {
      console.log(el);
    });
  }

  dismis() {
    this.router.navigate(['/schedule']);
  }
}
