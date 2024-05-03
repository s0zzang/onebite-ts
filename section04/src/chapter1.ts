// 함수 타입 표현식
type Add = (a: number, b: number) => number;
const add0: Add = (a, b) => a + b;

// 함수 타입 표현식 사용 예시
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

// 함수 타입 표현식 : 타입 별칭 없이 사용
const add1: (a: number, b: number) => number = (a, b) => a + b;

// 호출 시그니쳐
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;

// 호출 시그니처 : 프로퍼티 추가 정의
type Operation3 = {
  (a: number, b: number): number;
  name: string;
};

const add3: Operation3 = (a, b) => a + b;

add3(1, 2);
add.name;
