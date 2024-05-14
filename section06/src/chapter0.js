/* -------------------------------------------- */
/*              자바스크립트의 클래스                 */
/* -------------------------------------------- */

let studentA = {
  name: "이소정",
  age: 30,
  study() {
    console.log("공부하는 중 ...");
  },
  introduce() {
    console.log("소개하는 중 ...");
  },
};
let studentB = {
  name: "이승하",
  age: 31,
  study() {
    console.log("공부하는 중 ...");
  },
  introduce() {
    console.log("소개하는 중 ...");
  },
};

/* ----------------- 클래스 활용하기 ----------------- */
class Student {
  name;
  age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  study() {
    console.log("공부하는 중 ...");
  }
  introduce() {
    console.log(`${this.name} 소개하는 중 ...`);
  }
}

const studentC = new Student("짜장이", 6);
console.log(studentC);
studentC.study();
studentC.introduce();

/* -------------------- 상속 -------------------- */
class studentDeveloper extends Student {
  favoriteSkill;

  constructor(name, age, favoriteSkill) {
    super(name, age);
    this.favoriteSkill = favoriteSkill;
  }

  programming() {
    console.log(`${this.name}는 ${this.favoriteSkill}로 프로그래밍 중...`);
  }
}
const studentD = new studentDeveloper("짜장이", 6, "typeScript");
studentD.programming();
