import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empl-cell',
  templateUrl: './empl-cell.component.html',
  styleUrls: ['./empl-cell.component.css']
})
export class EmplCellComponent implements OnInit {
  @Input() emplFirstName:string;
  @Input() emplLastName:string;

  constructor() { }

  ngOnInit(): void {
  }

}
