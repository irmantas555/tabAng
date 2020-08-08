import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccell',
  templateUrl: './ccell.component.html',
  styleUrls: ['./ccell.component.css']
})
export class CcellComponent implements OnInit {
  monthdays:number = 31;

  constructor() { }

  ngOnInit(): void {
  }

}
