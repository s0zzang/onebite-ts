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

# 2️⃣ 인터페이스 확장(상속)하기

- 확장 : 타입 별칭에는 없지만 인터페이스에서만 사용할 수 있음
- 인터페이스 확장 : 하나의 인터페이스를 다른 인터페이스들이 상속받아 **중복된 프로퍼티를 정의하지 않도록** 도와주는 문법

```ts
// name, age 프로퍼티가 중복됨
interface Animal {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  age: number;
  isBark: boolean;
}

interface Cat {
  name: string;
  age: number;
  isScratch: boolean;
}

interface Chicken {
  name: string;
  age: number;
  isFly: boolean;
}
```

```ts
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  breed: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}
```

### 프로퍼티 재정의하기

```ts
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  name: "doldol"; // 타입 재 정의
  breed: string;
}
```

- extends로 받아온 프로퍼티를 재정의 가능
- 재정의 규칙 : 다시 정의하려는 타입이 원본 타입의 서브 타입이어야 함
  - string -> string literal 가능
  - string -> number 불가능

### 타입 별칭을 확장하기

```ts
type Animal = {
  name: string;
  color: string;
};

interface Dog extends Animal {
  breed: string;
}
```

- 인터페이스는 객체 타입이면 무조건 확장 가능

### 다중 확장

```ts
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  breed: "",
  isScratch: true,
};
```

- 여러 가지 인터페이스를 확장할 수 있음

# 3️⃣ 인터페이스 선언 합치기

- 타입 별칭 : 중복 선언 오류
- 인터페이스 : 중복 선언해도 오류 X -> 동일한 이름으로 정의하면 다 합쳐지기 때문에

### 선언합침(Declaration Merging)

```ts
type Person = {
  name: string;
};

type Person = { ❌
  age: number;
};

interface Person {
  name: string;
}

interface Person { // ✅
  age: number;
}
```

### 주의할 점

```ts
interface Person {
  name: string;
}

interface Person {
  name: number; // ❌ 오류 : 합칠 땐 반드시 동일한 타입으로 정의
  age: number;
}
```

- 동일한 프로퍼티를 중복 정의할 때 타입이 다르다면 **충돌 발생**
- 보통 사용되지 않고 라이브러리 타입 정의가 부실하여 모듈 보강할 때 사용함
