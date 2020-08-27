import { Time } from '@angular/common';

export class Shift {
    id: number;
    deptNumber: number;
    shiftNumber: number;
    startTime: string;
    endTime: string;
    timeOutMinutes: number;
    validFrom: boolean;
}
