# 1️⃣ 타입스크립트 이해하기

### 타입스크립트를 이해한다는 것은?

- 타입스크립트가 어떤 기준으로 타입을 정의하는지 이해
- 어떤 기준으로 타입들간의 관계를 정의하는지 이해
- 어떤 기준으로 타입스크립트 코드의 오류를 검사 하는지 그 원리와 동작 방식 이해

<br>

# 2️⃣ 타입은 집합이다

### 타입은 집합

- 타입스크립트의 '타입'은 사실 여러개의 값을 포함하는 '집합'
- 집합 : 동일한 속성을 갖는 여러개의 요소들을 하나의 그룹으로 묶은 단위
- 숫자 값들을 묶어 놓은 집합을 타입스크립트에서는 number 타입
- `let num: 20 = 20` 넘버 리터럴도 집합이고 넘버 타입의 부분 집합
  - 슈퍼타입(부모타입) : 넘버타입
  - 서브타입(자식타입) : 넘버 리터럴 타입
- 여러가지 기본 타입들간의 집합으로써의 부모-자식 관계

### 타입 호환성

- 어떤 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 것
- ⭕️ 넘버 타입에 넘버 리터럴 타입 할당
- ❌ 넘버 리터럴 타입에 넘버 타입 할당

```ts
let num1: number = 10; // 슈퍼타입
let num2: 10 = 10; // 서브타입
num1 = num2; // ⭕️ 넘버 = 넘버 리터럴 : 업 캐스팅
num2 = num1; // ❌ 넘버 리터럴 = 넘버 : 다운 캐스팅
```

- 업 캐스팅 : 모든 상황에 가능
- 다운 캐스팅 : 대부분의 상황에 불가능

<br>

# 3️⃣ 타입 계층도와 함께 기본타입 살펴보기

### unknown 타입 (전체 집합)

```ts
let a: unknown = 1; // number -> unknown
let b: unknown = "hello"; // string -> unknown
let c: unknown = true; // boolean -> unknown
let d: unknown = null; // null -> unknown
let e: unknown = undefined; // undefined -> unknown
let f: unknown = []; // Array -> unknown
let g: unknown = {}; // Object -> unknown
let h: unknown = () => {}; // Function -> unknown

let unknownValue: unknown;
let a: number = unknownValue; // ❌ unknown 타입은 number 타입에 할당할 수 없습니다.
```

- unknown 타입은 타입 계층도의 최 상단에 위치
- 모든 타입의 업 캐스팅이 가능하여 모든 값 할당 가능
- unknown 타입의 변수는 어떤 타입의 변수에도 할당이 불가능함 : 다운 캐스팅이 불가능해서

### never 타입 (공집합 타입)

```ts
let neverVar: never;

let a: number = neverVar; // never -> number
let b: string = neverVar; // never -> string
let c: boolean = neverVar; // never -> boolean
let d: null = neverVar; // never -> null
let e: undefined = neverVar; // never -> undefined
let f: [] = neverVar; // never -> Array
let g: {} = neverVar; // never -> Object

let a: never = 1; // number -> never ❌
let b: never = "hello"; // string -> never ❌
let c: never = true; // boolean -> never ❌
let d: never = null; // null -> never ❌
let e: never = undefined; // undefined -> never ❌
let f: never = []; // Array -> never ❌
let g: never = {}; // Object -> never ❌
```

- never 타입은 타입 계층도에서 가장 아래에 위치
- 공집합 : 아무것도 포함하지 않는 집합

### void 타입

```ts
function noReturnFunc(): void {
  console.log("hi");
}
```

- undefined의 슈퍼 타입

#### any 타입 (치트키)

```ts
let anyValue: any;

let num: number = anyValue; // any -> number (다운 캐스트)
let str: string = anyValue; // any -> string (다운 캐스트)
let bool: boolean = anyValue; // any -> boolean (다운 캐스트)

anyValue = num; // number -> any (업 캐스트)
anyValue = str; // string -> any (업 캐스트)
anyValue = bool; // boolean -> any (업 캐스트)
```

- `any`타입은 모든 타입의 슈퍼 타입이 되기도, 서브 타입이 되기도 함
- `never` 타입 변수에 다운 캐스팅 불가능
- 타입 계층도를 무시하는 위험한 타입

<br>

# 4️⃣ 객체 타입의 호환성

### 객체 타입의 호환성

- 어떤 객체 타입을 다른 객체타입으로 취급해도 괜찮은지

```ts
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

animal = dog; // ✅ OK : 업 캐스팅
dog = animal; // ❌ NO : 다운 캐스팅
```

- 객체 타입은 프로퍼티를 기준으로 슈퍼, 서브 관계를 가짐
  - 서브 타입 : 슈퍼 타입이 가진 프로퍼티를 모두 가지고 있고 추가 프로퍼티가 있는 타입
  - dog 타입 : animal 타입 + breed 프로퍼티

#### 초과 프로퍼티 검사

- 업 캐스팅은 가능하지만, 초과 프로퍼티 작성은 불가능 함
- 변수를 객체 리터럴로 초기화 할 때 발동하는 타입스크립트의 특수한 기능
- 타입에 정의된 프로퍼티 외의 다른 초과된 프로퍼티를 갖는 객체를 변수에 할당할 수 없도록 막음
- `객체 리터럴`로 정의할 때만 해당됨 (추후 자세히 다룰 예정)

<br>

# 5️⃣ 대수 타입

### 대수 타입이란?

- 여러 개의 타입을 합성해서 만드는 타입

### 합집합(Union) 타입

```ts
let a: string | number;
```

- 참여하는 타입들의 개수에는 제한이 없음

#### Union 타입으로 배열 타입 정의하기

```ts
let arr: (number | string | boolean)[] = [1, "hello", true];
```

#### Union 타입과 객체 타입

```ts
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

let union1: Union1 = {
  // ✅
  name: "",
  color: "",
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

let union4: Union1 = {
  // ❌
  name: "",
};
```

- 두 타입이 공통적으로 가진 name 프로퍼티 : 교집합
- name만 가진 변수 : dog, person에 모두 포함되지 않음

### 교집합(Intersection) 타입

#### Intersection 타입과 객체 타입

```ts
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Intersection = Dog & Person;

let intersection1: Intersection = {
  name: "",
  color: "",
  language: "",
};
```

- 프로퍼티가 하나라도 빠진다면 교집합 불가능

<br>

# 6️⃣ 타입 추론

<br>

# 7️⃣ 타입 단언

<br>

# 8️⃣ 타입 좁히기

<br>

# 9️⃣ 서로소 유니온 타입
