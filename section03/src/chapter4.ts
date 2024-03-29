// 합집합 타입 - Union 타입
let a: string | number | boolean;

a = 1;
a = "hello";
a = true;

let arr: (number | string | boolean)[] = [1, "hello", true];

type Dog = {
  name: string;
  color: string;
  cute: boolean;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

// 아래 모두 가능
let union1: Union1 = {
  // ✅
  name: "",
  color: "",
  cute: true,
};

let union2: Union1 = {
  // ✅
  name: "",
  language: "",
};

let union3: Union1 = {
  // ✅
  name: "",
  color: "",
  language: "",
};

let union3_2: Union1 = {
  // ✅
  name: "",
  color: "",
  language: "",
  cute: false,
};

let union4: Union1 = {
  // ❌
  name: "",
};
