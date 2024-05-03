// 함수 타입 정의

// 함수를 설명하는 가장 좋은 방법
// 어떤 매개변수를 받고, 어떤 결과값을 반환하는지 설명
function func(a: number, b: number): number {
  return a + b;
}
const add = (a: number, b: number): number => a + b;

// 매개변수 기본값 설정
function introduce(name = "이정환") {
  console.log(`name : ${name}`);
}

// 선택적 매개변수 설정
function introduce2(name = "이정환", tall?: number) {
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);
}

introduce2("이정환", 156);
introduce2("이정환");

// 나머지 매개변수
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}

// 나머지 매개변수 : 튜플 버전
function getSum2(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}

getSum(1, 2, 3); // ✅
getSum(1, 2, 3, 4); // ❌
