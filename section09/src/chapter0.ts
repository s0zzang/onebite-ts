/* -------------------------------------------- */
/*                  조건부 타입                    */
/* -------------------------------------------- */
// extends와 삼항 연산자를 이용해 각각 다른 타입ㅇ르 정의하도록 하는 문법

type A = number extends string ? string : number;

type objA = {
  a: number;
};
type objB = {
  a: number;
  b: number;
};

type B = objB extends objA ? number : string;
type C = objA extends objB ? number : string;

/* ---------------- 제네릭 조건부 타입 ---------------- */
type StringNumberSwitch<T> = T extends number ? string : number;
let varA: StringNumberSwitch<number>; // string
let varB: StringNumberSwitch<string>; // number

/* ------------------ 실용적인 예시 : 오류 O ----------------- */
function removeSpaces(text: string | undefined | null) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}
let result = removeSpaces("hi im sozzang");
result.toUpperCase();

/* ---------- 실용적인 예시 : 제네릭 조건부 타입 활용 with 타입 단언 --------- */
function removeSpaces2<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return text.replaceAll(" ", "") as any;
  } else {
    return undefined as any;
  }
}

/* ---------- 실용적인 예시 : 제네릭 조건부 타입 활용 with 함수 오버로딩 --------- */
function removeSpaces3<T>(text: T): T extends string ? string : undefined;
function removeSpaces3(text: string) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}
