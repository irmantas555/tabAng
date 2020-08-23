import {Component, OnInit} from '@angular/core';
import {AppDataService} from '../services/app-data.service';
import {HolidayDto} from '../holiday-dto';
import {Country} from '../country';
import {Holiday} from "../holiday";


@Component({
  selector: 'app-holidaydata',
  templateUrl: './holidaydata.component.html',
  styleUrls: ['./holidaydata.component.css']
})
export class HolidaydataComponent implements OnInit {
  holiday: Holiday = new Holiday();
  holidays: Holiday[] = [];
  countries: Country[] = [];
  date: string;
  defaultCountry: Country = new Country();
  everyY:boolean;


  constructor(private dataserv: AppDataService) {
  }

  ngOnInit(): void {
    this.holidays = this.dataserv.allHolidays
    this.countries = this.dataserv.allCountries
    this.defaultCountry = this.dataserv.allCountries[0]
  }

  sendHoliday() {
    this.holiday.date = this.date
    this.holiday.everyear = true;
    // console.log('started country = ' + JSON.stringify(this.holiday));
    this.dataserv.postHoliday(this.holiday);

  }
}
