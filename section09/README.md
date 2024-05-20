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

```

# infer
