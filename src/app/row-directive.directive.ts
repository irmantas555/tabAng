import { Directive,  HostListener } from '@angular/core';
import { ScheduleService } from './schedule.service';
interface rowcol {
  row: number;
  col: number;
}

@Directive({
  selector: '[appRowDirective]',
})
export class RowDirectiveDirective {
  mousedown: boolean = true;

  @HostListener('mouseenter') onmouseenter() {
    // console.log('Mouse enter fired')
    if (this.scheduleService.mouseDProperty === true) {
    }
  }

  constructor(
    private scheduleService: ScheduleService
  ) {}
}
