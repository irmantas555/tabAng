import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { CausesdataComponent } from './causesdata/causesdata.component';
import { CauseObject } from './cause-object';
import { Country } from './country';
import { Department } from './department';
import { Holiday } from './holiday';
import { Shift } from './shift';

@Injectable({
  providedIn: 'root',
})
export class AppDataService implements OnInit {
  // cause properties
  causesdata = new Subject<string>();
  causeob: CauseObject = new CauseObject();
  allCauses: CauseObject[];
  // country properties
  countrydata = new Subject<string>();
  countryob: Country = new Country();
  allCounties: Country[];
  //Department properties
  departmentdata = new Subject<string>();
  departmentob: Department = new Department();
  allDepartments: Department[];
  //Holiday properties
  holidaytdata = new Subject<string>();
  holidayob: Holiday = new Holiday();
  allHolidays: Holiday[];
  //Shift properties
  shifttdata = new Subject<string>();
  shiftob: Shift = new Shift();
  allShifts: Shift[];

  optionjson = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getCauses() {
    this.http
      .get('http://localhost:8080/dto/cause')
      .subscribe((response: CauseObject[]) => {
        response.forEach((element) => {
          this.causesdata.next(element.cause + ' Kodas: ' + element.cod);
        });
      });
  }

  postCause(receivedCause: CauseObject) {
    console.log('received' + receivedCause);
    this.causeob = receivedCause;
    console.log(this.causeob);
    this.http
      .post(
        'http://localhost:8080/dto/cause',
        JSON.stringify(this.causeob),
        this.optionjson
      )
      .subscribe((response) => {
        this.causesdata.next(
          receivedCause.cause + ' Kodas:' + receivedCause.cod
        );
        console.log('cuse posted');
      }),
      (err) => {
        console.log('there was an error posting: ' + err);
      };
  }

  getCountries() {
    this.http
      .get('http://localhost:8080/dto/country')
      .subscribe((response: Country[]) => {
        response.forEach((element) => {
          this.countrydata.next(element.name);
        });
      });
    }

      postCountry(receivedCountry: Country) {
        this.countryob = receivedCountry;
        this.http
          .post(
            'http://localhost:8080/dto/country',
            JSON.stringify(this.countryob),
            this.optionjson
          )
          .subscribe((response) => {
            this.countrydata.next(
              receivedCountry.name
            );
          }),
          (err:any) => {
            console.log('There was an error posting: ' + err);
          };
  }
  getDepartments() {
    this.http
      .get('http://localhost:8080/dto/department')
      .subscribe((response: Department[]) => {
        response.forEach((element) => {
          this.departmentdata.next(element.name + `     ` + element.country);
        });
      });
    }

      postDepartment(receivedDept: Department) {
        this.departmentob = receivedDept;
        this.http
          .post(
            'http://localhost:8080/dto/department',
            JSON.stringify(this.departmentob),
            this.optionjson
          )
          .subscribe((response) => {
            this.countrydata.next(
              receivedDept.name
            );
          }),
          (err:any) => {
            console.log('There was an error posting: ' + err);
          };
  }
  getHolidays() {
    this.http
      .get('http://localhost:8080/dto/holiday')
      .subscribe((response: Holiday[]) => {
        response.forEach((element) => {
          this.holidaytdata.next(element.date + ' ' + element.name);
        });
      });
    }

      postHoliday(receivedHoliday: Holiday) {
        this.holidayob = receivedHoliday;
        this.http
          .post(
            'http://localhost:8080/dto/holiday',
            JSON.stringify(this.departmentob),
            this.optionjson
          )
          .subscribe((response) => {
            this.countrydata.next(
              receivedHoliday.date
            );
          }),
          (err:any) => {
            console.log('There was an error posting: ' + err);
          };
  }
  getShifts() {
    this.http
      .get('http://localhost:8080/dto/shift')
      .subscribe((response: Shift[]) => {
        response.forEach((element) => {
          this.holidaytdata.next(element.department + ' ' + element.shiftNumber + ' ' + element.startTime + ' ' + element.endTime + ' ' + element.timeOutMinutes);
        });
      });
    }

      postShift(receivedShift: Shift) {
        this.shiftob = receivedShift;
        this.http
          .post(
            'http://localhost:8080/dto/shift',
            JSON.stringify(this.shiftob),
            this.optionjson
          )
          .subscribe((response) => {
            this.countrydata.next(
              receivedShift.department + ' ' + receivedShift.shiftNumber + ' ' + receivedShift.startTime + ' ' + receivedShift.endTime + ' ' + receivedShift.timeOutMinutes
            );
          }),
          (err:any) => {
            console.log('There was an error posting: ' + err);
          };
  }











}
