/* -------------------------------------------- */
/*            keyof & typeof 연산자              */
/* -------------------------------------------- */
// keyof 연산자 : 객체 타입으로부터 프로퍼티의 모든 key들을 string literal union 타입으로 추출하는 연산자

interface Person {
  name: string;
  age: number;
}

// 1️⃣ 직접 모든 키 나열
function getPropertyKey(person: Person, key: "name" | "age") {
  return person[key];
}
// 2️⃣ keyof 연산자 사용 : 모든 프로퍼티 키를 string literal union 타입으로 추출
function getPropertyKey2(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "소정",
  age: 100,
};

/* ---------------- with typeof --------------- */
type Person2 = typeof person;
function getPropertyKey3(person: Person, key: keyof typeof person) {
  return person[key];
}
