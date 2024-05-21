# 조건부 타입

- extends와 삼항 연산자를 이용해 조건에 따라 각각 다른 타입을 정의

```ts
type A = number extends string ? number : string;
```

```ts
type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string;
```

### 제네릭 조건부 타입

```ts
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>;
// string
let varB: StringNumberSwitch<string>;
// number
```

- 타입을 가변적으로 사용하면서, 논리에 따라 타입을 변경할 수 있음

```ts
function removeSpaces<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return 0 as any; // 문제 감지 못함
  } else {
    return undefined as any;
  }
}

let result = removeSpaces("hi im winterlood");
// string

let result2 = removeSpaces(undefined);
// undefined
```

```ts
function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
// string

let result2 = removeSpaces(undefined);
// undefined
```

# 분산적인 조건부 타입

```ts
type StringNumberSwitch<T> = T extends number ? string : number;

let c: StringNumberSwitch<number | string>;
// string | number
```

- 유니언타입 할당시 한 번은 number, 한 번은 string으로 분리되어 들어감
- 분리된 결과를 유니언으로 묶기 때문에 string | number (순서 상관 없음)

### exclude 조건부 타입 구현하기

```ts
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>; // number | boolean
```

- 타입 변수T가 U의 서브타입이라면 never, 아니라면 T
- 유니언 타입에 never가 있다면 사라짐 : 공집합과 합집합을 하면 원래 원본 집합이 남기 때문에

### 분산적 조건부 타입 막는 방법

```ts
type StringNumberSwitch<T> = [T] extends [Number] ? string : number;
let A = StringNumberSwitch<boolean | number | string>; // number
```

- boolean | number | string의 합집합 유니언 타입은 number의 서브 타입이 아니기 때문에 false

# infer(inference) : 추론

- 조건부 타입 내에서 특정 타입을 추론하는 문법

```ts
type ReturnType<T> = T extends () => infer R ? R : never;

type FuncA = () => string;

type FuncB = () => number;

type A = ReturnType<FuncA>;
// string

type B = ReturnType<FuncB>;
// number

type C = ReturnType<number>;
// never
// number가 ()=>any 어떤 타입이 추론되더라도 true가 될 수 없음
```

- `infer R` : `()=>string` **조건식이 true가 되는 타입**을 추론함
