/* -------------------------------------------- */
/*                  접근 제어자                    */
/* -------------------------------------------- */
class Employee {
  // 필드
  name: string; // 자동으로 public
  private age: number;
  protected position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log(`${this.name}`);
    console.log(`${this.age}`);
    console.log(`${this.position}`);
  }
}

class ExecutiveOfficer extends Employee {
  // 메서드
  func() {
    this.name; // ✅ 가능
    this.age; // ❌ 오류 : private은 파생 클래스에서 접근 불가
    this.position; // ✅ 가능 : protected는 파생 클래스에서 접근 가능
  }
}

const employee = new Employee("이정환", 27, "devloper");

/* ---------- public : 모든 범위에서 접근 가능 ---------- */
employee.name = "홍길동";
/* --------- private : 클래스 내부에서만 접근 가능 -------- */
employee.age = 30; // ❌ 클래스 내부에서만 접근 가능(메서드)
/* -- proteced : 클래스 내부 또는 파생 클래스 내부에서만 접근 가능 - */
employee.position = "디자이너";

/* ------------------ 필드 생략하기 ----------------- */
class Employee2 {
  // private name: string;
  // private age: number;
  private position: string;

  constructor(private name: string, protected age: number, position: string) {
    // this.name = name;
    // this.age = age;
    this.position = position;
  }
}
