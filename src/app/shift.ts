import { Time } from '@angular/common';

export class Shift {
    department: number;
    shiftNumber: number;
    startTime: Time;
    endTime: Time;
    timeOutMinutes: number;
    validFrom: boolean;
}
