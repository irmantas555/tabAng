import { Time } from '@angular/common';

export class ExHours {
    id:number;
    exCause:number;
    coefficient:number;
    starTime:Time;
    endTime:Time;
    validWeekend:boolean;
    validEveryday:boolean;
    validHollidays:boolean;
    coefSums:boolean;
}
