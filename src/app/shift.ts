import { Time } from '@angular/common';

export class Shift {
    department:string;
    shiftNumber:number;
    startTime:Time;
    endTime:Time;
    timeOutMinutes:number;
    validFrom:boolean;
}
