import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Holiday } from '../holiday';
import { Country } from '../country';


@Component({
  selector: 'app-holidaydata',
  templateUrl: './holidaydata.component.html',
  styleUrls: ['./holidaydata.component.css']
})
export class HolidaydataComponent implements OnInit {
  holiday:Holiday = new Holiday;
  everyyear:boolean;
  countries:string[]=[];
  holidaylisted:string='';
  holidays:string[]=[];


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getHolidays();
    this.dataserv.holidaytdata.subscribe((nexth)=>{
      this.holidays.push(nexth);
    });
    this.dataserv.getCountries();
    this.dataserv.countrydata.subscribe((nextcountry)=>{
      console.log(nextcountry);
      this.countries.push(nextcountry);
    });
  }

  sendHoliday(){
   console.log('started country = ' + this.holiday) 
   this.dataserv.postHoliday(this.holiday)
  
  }
}
