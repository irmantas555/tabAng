export class AlterDataSet {
  employeeId: number;
  firstName: string;
  lastName: string;
  days: number[];

  constructor(employeeId: number) {
    this.employeeId = employeeId;
    this.days = [];
  }
}
