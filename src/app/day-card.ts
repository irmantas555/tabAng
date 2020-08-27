import { Time } from '@angular/common';

export class DayCard {
  employeeId: number;   // Emlp
  id: number;
  day: number;          // DayCard
  cause: number;        // DayCard
  startTime: Time;      // DayCard
  endTime: Time;        // DayCard
  causeStr: string;     // Cause
  causeCod: string;     // Cause
  extraTime: number;    // calculated
}
