import { Time } from '@angular/common';

export class CardOb {
    employeeId:number //Emlp
    day:number;        //DayCard
    startTime:Time;     //DayCard
    cause:number        //DayCard
    causeStr:string;    //Cause
    causeCod:string;       //Cause
    endTime:Time;          //DayCard
    extraTime:number;       //calculated
}
