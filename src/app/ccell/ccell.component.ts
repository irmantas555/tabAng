import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ccell',
  templateUrl: './ccell.component.html',
  styleUrls: ['./ccell.component.css']
})
export class CcellComponent implements OnInit {
  monthdays:number = 31;
  @Input() celld = '';
  @Input() weekday:number;
  constructor() { }

  ngOnInit(): void {
  }

}
