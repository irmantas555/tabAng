import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-countrydata',
  templateUrl: './countrydata.component.html',
  styleUrls: ['./countrydata.component.css']
})
export class CountrydataComponent implements OnInit {
  country:Country = new Country;
  countrylisted:string='';
  coutries:string[]=[];


  constructor(private dataserv:AppDataService) { }

  ngOnInit(): void {
    this.dataserv.getCountries();
    this.dataserv.countrydata.subscribe((nextcountry) =>{
      this.coutries.push(nextcountry.name);
    })
  }

  sendCause(){
   console.log('started country = ' + this.country)
   this.dataserv.postCountry(this.country)

  }
}
