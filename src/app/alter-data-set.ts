export class AlterDataSet {
  employeeId: number;
  emplRow: number;
  firstName: string;
  lastName: string;
  days: number[];

  constructor(employeeId: number) {
    this.employeeId = employeeId;
    this.days = [];
  }
}
