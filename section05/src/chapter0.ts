/* -------------------------------------------- */
/*                    인터페이스란?                   */
/* -------------------------------------------- */
// 객체에 특화된 타입 별칭과 동일하게 타입에 이름을 지어주는 또 다른 문법

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "이소정",
  age: 100,
};

/* ----------------- 선택적 프로퍼티 ----------------- */
interface Person2 {
  name: string;
  age?: number;
}

const person2: Person2 = {
  name: "이름이름",
};

/* ---------------- 읽기 전용 프로퍼티 ---------------- */
interface Person3 {
  readonly name: string;
  age?: number;
}

const person3: Person3 = {
  name: "이름이름",
};

person3.name = "dddd";
person3.age = 200;

/* ---------------- 메서드 타입 정의하기 --------------- */
// 함수 타입 표현식
interface Person4 {
  readonly name: string;
  age?: number;
  sayHi: () => void;
}
// 호출 시그니쳐
interface Person5 {
  readonly name: string;
  age?: number;
  sayHi(): void;
}

/* ----------------- 메서드 오버로딩 ----------------- */
// 함수 타입 표현식 - 불가능
interface Person6 {
  readonly name: string;
  age?: number;
  sayHi: () => void;
  sayHi: (a: number) => void;
}
// 호출 시그니쳐 - 가능
interface Person7 {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
}

/* -------------------- 주의점 ------------------- */
// Union, Intersection 타입 정의 불가
type Type1 = number | string;
type Type2 = number & string;

interface Person8 {
  name: string;
  age: number;
} | number

type Type3 = number | string | Person;
type Type4 = number & string & Person;

const person1: Person2 | string = {
  name: '이름',
  age: 10,
}