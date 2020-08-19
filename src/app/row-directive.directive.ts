import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';
import { ScheduleService } from './schedule.service';
interface rowcol{
  row:number;
  col:number;
}

@Directive({
  selector: '[appRowDirective]'
})
export class RowDirectiveDirective {
  mousedown:boolean=true;


@HostListener ('mousedown') onmousedown(){
  // this.scheduleService.mouseDown.next(true)
  console.log(this.el.nativeElement.getAttribute('data-col-index'))
  this.scheduleService.mouseDProperty=true
  console.log('Mouse down fired')
  let row:number = Number(this.el.nativeElement.getAttribute('data-col-index'))
  let col:number =  Number(this.el.nativeElement.closest('.rowgrid').getAttribute('data-row-index'))
  console.log('sending ' + row + ' '+  col)
  this.scheduleService.colsRowsSub.next({row,col})
}
@HostListener ('mouseenter') onmouseenter(){
  // console.log('Mouse enter fired')
  if(this.scheduleService.mouseDProperty==true){
    let row:number = Number(this.el.nativeElement.getAttribute('data-col-index'))
    let col:number =  Number(this.el.nativeElement.closest('.rowgrid').getAttribute('data-row-index'))
    this.scheduleService.colsRowsSub.next({row,col})
  }
  }

@HostListener ('mouseup') onmouseup(){
  console.log('Mouse up fired')
    this.scheduleService.mouseDProperty=false
  }




  constructor(private el:ElementRef, private renderer:Renderer2, private scheduleService:ScheduleService) {
   }


}
