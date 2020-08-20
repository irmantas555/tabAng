import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { HolidayDto } from '../holiday-dto';
import { Country } from '../country';


@Component({
  selector: 'app-holidaydata',
  templateUrl: './holidaydata.component.html',
  styleUrls: ['./holidaydata.component.css']
})
export class HolidaydataComponent implements OnInit {
  holiday: HolidayDto = new HolidayDto;
  everyyear: boolean;
  countries: string[] = [];
  holidaylisted = '';
  holidays: string[] = [];


  constructor(private dataserv: AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getDtoHolidays();
    this.dataserv.holidaytdata.subscribe((nexth) => {
      this.holidays.push(nexth.name + ' ' + nexth.date + ' ' + nexth.everyear + ' ' + nexth.country);
    });
    this.dataserv.getCountries();
    this.dataserv.countrydata.subscribe((nextcountry) => {
      console.log(nextcountry);
      this.countries.push(nextcountry.name);
    });
  }

  sendHoliday(){
   console.log('started country = ' + this.holiday);
   this.dataserv.postHoliday(this.holiday);

  }
}
