import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ccell',
  templateUrl: './ccell.component.html',
  styleUrls: ['./ccell.component.css']
})
export class CcellComponent implements OnInit {
  @Input() celld = '';
  @Input() weekday:number;
  celine:boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
