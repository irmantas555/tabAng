import { Time } from '@angular/common';

export class CardOb {
    employeeId:number
    day:number;
    startTime:Time;
    timeouts:number;
    duration:number;
    cause:number
    causeStr:string;
    causeCod:string;
    endTime:Time;
    extraTime:number;
}
