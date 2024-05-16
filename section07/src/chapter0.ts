/* -------------------------------------------- */
/*                  제네릭 소개                    */
/* -------------------------------------------- */

// 제네릭 : 일반적인, 포괄적인, 범용적인

function func(value: any) {
  return value;
}

let num = func(10); // any
let str = func("sss"); // any
str.toFixed(); // 분명 문자열인데 타입이 any로 설정되어 오류가 발생하지 않음

function func2(value: unknown) {
  return value;
}

let num2 = func2(10); // unknown
let str2 = func2("123"); // unknown
str2.toUpperCase(); // unknown이라서 불가능
if (typeof str2 === "string") str2.toUpperCase(); // 이렇게 해야만 가능함

/* ----------------- 제네릭 함수 사용 ---------------- */
function func3<T>(value: T): T {
  return value;
}

let num4 = func3(10); // number
num4.toFixed();
num4.toUpperCase();

/* ------------ 제네릭 함수의 타입 변수를 명시하기 ----------- */
function func4<T>(value: T): T {
  return value;
}

let arr = func4([1, 2, 3]); // number[]
let arr2 = func4<[number, number, number]>([1, 2, 3]); // [number, number, number]
