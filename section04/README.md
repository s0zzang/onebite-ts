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
// 반환값은 작성하지 않아도 자동으로 추론됨
function func(a: number, b: number) {
  return a + b;
}
```

#### 화살표 함수 타입 정의하기

```ts
const add = (a: number, b: number): number => a + b;
const add = (a: number, b: number) => a + b; // 반환값 자동 추론
```

#### 매개변수 기본값 정의하기

```ts
function introduce(name = "이정환") {
  console.log(`name : ${name}`);
}
```

- 매개변수에 기본값이 설정되어 있다면 **타입이 자동으로 추론**됨
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
- 직접 명시한 number 또는 undefined로 타입이 추론되기 때문에 number로 사용하기 위해선 타입 좁히기 필요
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

- 내용 어려움 좌절하지 말기

### 함수 타입의 호환성이란?

- 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단
- 아래 기준 2가지가 모두 가능해야 함수의 타입이 호환된다고 할 수 있음

### 기준 1: 반환값 타입이 호환되는가?

```ts
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // ✅ : 업 캐스팅
b = a; // ❌ : 넘버 타입을 넘버 리터럴로 취급하는 다운 캐스팅
```

- 반환값끼리 업, 다운 캐스팅 여부에 따라 호환 여부가 결정됨

### 기준 2: 매개변수의 타입이 호환되는가?

#### 2-1. 매개변수의 개수가 같을 때

```ts
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // ❌ = D타입을 C타입으로 취급하겠다 = 넘버 리터럴 타입을 넘버타입으로 취급하겠다 = 업캐스팅
d = c; // ✅ = C타입을 D타입으로 취급하겠다 = 넘버 타입을 넘버 리터럴 타입으로 취급하겠다 = 다운캐스팅
```

- 매개변수끼리는 다운 캐스팅만 호환이 가능함 (반환값과 다름 ...)
  - 다운 캐스팅만 가능한 이유 : 매개변수가 객체 타입을 사용하는 예시 참고 (아래)

```ts
// 매개변수는 다운 캐스팅만 호환이 가능함
Copy;
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

animalFunc = dogFunc; // ❌ :testFunc와 같은 업캐스팅
dogFunc = animalFunc; // ✅ :testFunc2와 같은 다운캐스팅

let testFunc = (animal: Animal) => {
  // 매개변수는 animal, 본문은 dog 따라감 : dogFunc의 타입을 Animal로 취급하는거니까
  console.log(animal.name);
  console.log(animal.color); // 오류 발생! : animal에는 color 프로퍼티가 없음
};

let testFunc2 = (dog: Dog) => {
  // 매개변수는 dog, 본문은 animal 따라감 : animalFunc의 타입을 Dog로 취급하는거니까
  console.log(animal.name);
};
```

#### 2-2. 매개변수의 개수가 다를 때

```ts
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // ✅ : func2 타입(1개)을 func1(2개) 타입으로 취급하겠다
func2 = func1; // ❌ : func1 타입(2개)을 func2(1개) 타입으로 취급하겠다
```

- 기본 조건 : 타입이 같아야 함
- 매개변수 개수가 더 많은 쪽으로 할당 가능 : 1개 = 2개
- 할당하려고 하는 쪽의 함수의 타입에 매개변수의 개수가 더 적을 때만 호환 가능

<br>

# 4️⃣ 함수 오버로딩

- 하나의 함수를 **매개변수의 개수나 타입에 따라 다르게 동작**하도록 만드는 문법
- 자스는 지원이 안되고 오직 타스에서만 지원됨

### 버전별 오버로드 시그니쳐

```ts
// 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;
```

- **오버로드 시그니쳐** : 구현식 없이 선언부만 만들어둔 함수

### 구현 시그니쳐

```ts
// 실제 구현부 -> 구현 시그니쳐
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1); // ✅ 버전 1 - 오버로드 시그니쳐
func(1, 2); // ❌
func(1, 2, 3); // ✅ 버전 3 - 오버로드 시그니쳐
```

<br>

# 5️⃣ 사용자 정의 타입가드

- 참 또는 거짓을 반환하는 함수를 이용해 우리 입맛대로 타입 가드를 만들 수 있도록 도와주는 타입스크립트의 문법

```ts
type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;

function warning(animal: Animal) {
  if ("isBark" in animal) {
    console.log(animal.isBark ? "짖습니다" : "안짖어요");
  } else if ("isScratch" in animal) {
    console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
  }
}
```

- in 연산자를 이용해 타입을 좁히는 방식은 좋지 않음
  - 어떤 타입인지 직관적으로 확인하기 어려움
  - 프로퍼티 키가 바뀐다면 타입 좁히기가 어려움(모두 변경해야 함)

#### 함수를 이용한 커스텀 타입 가드

```ts
// Dog 타입인지 확인하는 타입 가드
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

// Cat 타입인지 확인하는 타입가드
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log(animal.isBark ? "짖습니다" : "안짖어요");
  } else {
    console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
  }
}
```
