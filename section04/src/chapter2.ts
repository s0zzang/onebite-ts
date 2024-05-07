// 함수 타입의 호환성이란?

// 다음 2가지 기준으로 함수 타입의 호환성을 판단하게 됩니다.
/* -------------------------------------------- */
/*      1. 두 함수의 반환값 타입이 호환되는가?           */
/* -------------------------------------------- */
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // ✅ 업캐스팅
// b = a; // ❌ 다운캐스팅

/* -------------------------------------------- */
/*    2. 두 함수의 매개변수의 타입이 호환되는가?          */
/* -------------------------------------------- */
/* ---------- 2-1. 매개변수의 개수가 같을 때 ---------- */
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

// c = d; // ❌ 업캐스팅
d = c; // ✅ 다운캐스팅

/* -------------------------------------------- */
/*      다운캐스팅이 가능한 이유 자세히 알아보기          */
/* -------------------------------------------- */
type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

// animalFunc = dogFunc; // ❌ 아래 '이것과 같음' 참고
dogFunc = animalFunc; // ✅

/* ----------------- 이것과 같음 ---------------- */
let animalFunc2 = (animal: Animal) => {
  console.log(animal.name); // ✅
  // console.log(animal.color); // ❌
};

/* ------------ 2-2. 매개변수의 개수가 다를 때 ----------- */

type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // ✅
// func2 = func1; // ❌
