import { Component, OnInit, Input } from '@angular/core';
import { DayCard } from '../day-card';

@Component({
  selector: 'app-dcell',
  templateUrl: './dcell.component.html',
  styleUrls: ['./dcell.component.css']
})
export class DcellComponent implements OnInit {
  @Input() cellDayCard:DayCard;
  @Input() cellCards:DayCard[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
