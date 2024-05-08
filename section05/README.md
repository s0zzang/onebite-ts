# 1️⃣ 인터페이스

- 인터페이스란?
  - 타입에 이름을 지어주는 또 다른 문법
  - 상호간의 약속된 규칙
  - **객체의 구조를 정의**하는데 특화된 문법(상속, 합침 등의 특수 기능 제공)

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "류선재",
  age: 27,
};
```

### 선택적 프로퍼티

```ts
interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};
```

### 읽기 전용 프로퍼티

```ts
interface Person {
  readonly name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};

person.name = "홍길동"; // ❌
```

### 메서드 타입 정의하기

```ts
// 함수타입 표현식
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;
}

// 호출 시그니쳐
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
}
```

- interface에서 호출 시그니쳐를 사용할 땐, 함수 이름을 붙여줘야 함

### 메서드 오버로딩

```ts
// 함수 타입 표현식
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;
  sayHi: (a: number, b: number) => void; // ❌
}

// 호출 시그니쳐
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
  sayHi(a: number, b: number): void; // ⭕️
}
```

- 함수 타입 표현식 불가능 (식별자가 중복되었다는 오류 발생)
- 호출 시그니쳐 가능

### 주의할 점

```ts
type Type1 = number | string;
type Type2 = number & string;

interface Person {
  name: string;
  age: number;
} | number // ❌

type Type1 = number | string | Person;
type Type2 = number & string & Person;

const person: Person & string = {
  name: "이정환",
  age: 27,
};
```

- 타입 별칭과 동일하게 동작하지만 몇가지 차이점이 존재
  - interface : Union이나 Intersection 타입을 정의 불가
  - 해결법 : 타입 별칭과 함께 사용하거나 타입 주석에서 직접 사용

```ts
// 헝가리안 표기법
interface IPerson {
  readonly name: string;
  age?: number;
  sayHi: () => void;
}
```

- 자바스크립트에서는 잘 사용하지 않는 표기법
- 강사님은 선호하진 않지만 팀의 규칙을 따라가야 함

# 2️⃣ 인터페이스 확장하기

```ts

```

# 3️⃣ 인터페이스 선언 합치기
