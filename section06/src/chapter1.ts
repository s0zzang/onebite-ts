/* -------------------------------------------- */
/*               타입스크립트의 클래스                 */
/* -------------------------------------------- */

class Employee {
  name: string;
  age: number;
  position?: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  work() {
    console.log("일 중 ...");
  }
}

/* ----------------- 클래스 = 타입 ----------------- */
const employeeA: Employee = {
  name: "",
  age: 0,
  work() {},
};

/* ------------------ 클래스 상속 ------------------ */
class ExecutiveOfficer extends Employee {
  officerNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officerNumber: number
  ) {
    super(name, age, position);
    this.officerNumber = officerNumber;
  }
}
