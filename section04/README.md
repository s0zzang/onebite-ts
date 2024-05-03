# 1️⃣ 함수 타입

### 함수의 타입을 정의하는 방법

```ts
// 함수를 설명하는 가장 좋은 방법
// js : 어떤 매개변수를 받고, 어떤 결과값을 반환하는지 설명
function func(a, b) {
  return a + b;
}

// ts : 어떤 '타입의' 매개변수를 받고, 어떤 '타입의' 값을 반환하는지
function func(a: number, b: number): number {
  return a + b;
}
```

```ts
// 반환값을 작성하지 않아도 자동으로 추론됨
function func(a: number, b: number) {
  return a + b;
}
```

#### 화살표 함수 타입 정의하기

```ts
const add = (a: number, b: number): number => a + b;
const add = (a: number, b: number) => a + b;
```

#### 매개변수 기본값 정의하기

```ts
function introduce(name = "이정환") {
  console.log(`name : ${name}`);
}
```

- 매개변수에 기본값이 설정되어 있다면 타입이 자동으로 추론됨
- 주의점
  1. 기본값과 다른 타입을 정의하면 오류 발생
  2. 자동 추론된 매개변수의 타입과 다른 인수를 전달하면 오류 발생

#### 선택적 매개변수 설정하기

```ts
function introduce(name = "이정환", tall?: number) {
  // number | undefined
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);

  // tall 사용하려면 타입 가드 필요
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}

introduce("이정환", 156);
introduce("이정환"); // tall 인수 생략 가능
```

- 변수 뒤에 '?' 붙이기
- 선택적 프로퍼티와 유사함
- 주의점 : 선택적 매개변수(tall)는 필수 매개변수(name) 앞에 올 수 없음 (생략이 불가능하기 때문에)

#### 나머지 매개변수

```ts
function getSum(...rest: number[]) {
  // number[]: number 타입의 배열
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum; // 반환값의 타입은 자동 추론
}

// 고정 개수를 설정하고 싶다면, 튜플 타입으로 선언하기
function getSum(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}

getSum(1, 2, 3); // ✅
getSum(1, 2, 3, 4); // ❌
```

- rest 파라미터 : 가변적인 길이의 인수를 전달받을 때 유용

<br>

# 2️⃣ 함수 타입 표현식과 호출 시그니처

- 함수 타입 표현식, 호출 시그니처 : 함수의 타입을 별도로 정의하는 문법

### 함수 타입 표현식

```ts
// Add = (매개변수 타입 정의) => 반환값 타입 정의
type Add = (a: number, b: number) => number;
// 타입 별칭 없이 사용한 경우(가독성이 좀 떨어지는 듯...)
const add: (a: number, b: number) => number = (a, b) => a + b;

const add: Add = (a, b) => a + b;
```

- 함수 타입을 표현식으로 정의할 땐, 매개변수의 개수와 타입을 모두 맞춰야 함

#### 예시

- 여러 함수가 동일한 타입을 갖는 경우 요긴하게 사용됨

```ts
// 중복 코드 ㅠ
const add = (a: number, b: number) => a + b;
const sub = (a: number, b: number) => a - b;
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number) => a / b;

// 아래처럼 사용 : 중복코드 못참는 개발자 특 -> 중복 못참아 다 지워
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;
```

### 호출 시그니쳐 (Call Signature)

```ts
type Operation2 = {
  (a: number, b: number): number;
};

function func(a: number): void {}
// (a: number): void - 이 부분을 똑 뗀 것

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;
```

- 객체 타입을 정의하듯 중괄호 안에 작성함 : 함수도 객체이기 때문에
  - 함수이자 일반 객체를 의미하는 타입으로 정의됨 = 하이브리드 타입

<br>

# 3️⃣ 함수 타입의 호환성

<br>

# 4️⃣ 함수 오버로딩

<br>

# 5️⃣ 사용자 정의 타입가드
