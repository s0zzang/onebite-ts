# 제네릭 소개

### 제네릭이란?

- 함수나 인터페이스, 타입 별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어 주는 타입스크립트의 놀라운 기능
- 제네릭 : 일반적인, 포괄적인 = general(like: 종합 병원)
  - 제네릭 함수 : 모든 타입을 두루 사용할 수 있는 함수계 종합 병원 느낌

### 제네릭이 필요한 상황

```ts
function func(value: any) {
  return value;
}

let num = func(10); // 반환값 : any 타입
let str = func("string"); // 반환값 : any 타입
num.toUpperCase(); // 오류 발생 X
```

```ts
function func(value: unknown) {
  return value;
}

let num = func(10); // 반환값 : unknown 타입
num.toUpperCase(); // 오류 발생 O
num.toFixed(); // 오류 발생 O : number인데도 타입이 unknown이라서 오류가 발생함

if (typeof num === "number") num.toFixed(); // 이렇게 해야만 함
```

- 다양한 타입의 매개변수를 받아 해당 매개변수를 그대로 반환하는 함수
- 매개변수의 타입을 any, unknown으로 설정할 수 없음
- 해결방법 : **제네릭 함수**로 만들기

### 제네릭(Generic) 함수

- 관례적으로 T, U, V 를 사용함

```ts
function func<T>(value: T): T {
  return value;
}

let num = func(10); // 반환값 : number 타입
```

- 타입 변수 `<T>`
- 타입을 담는 변수라서 상황에 따라 다른 타입을 담을 수 있음
- 타입은 함수를 호출할 때 결정됨

#### 명시적으로 타입 설정하기

```ts
function func<T>(value: T): T {
  return value;
}

let arr = func<[number, number, number]>([1, 2, 3]);
```

- 튜플 타입으로 명시하기
- 코드의 흐름

1. T에 [Number, Number, Number] 튜플 타입이 할당됨
2. 매개변수 value와 반환값 타입이 모두 튜플 타입이 됨

# 타입 변수 응용하기

### 사례 1

- 매개변수의 타입이 서로 다를 때, 타입 변수 여러 개 선언하기

```ts
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
```

### 사례 2

- 다양한 값을 담은 배열의 타입 변수 선언하기

```ts
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// number

let str = returnFirstValue(["hello", "mynameis"]);
// string

let str = returnFirstValue([1, "hello", "mynameis"]);
// number | string
```

### 사례 3

- 위의 사례2 보완 가능한 코드
- 유니언 타입인 경우, 튜플 타입과 나머지 파라미터를 사용하기

```ts
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let str = returnFirstValue([1, "hello", "mynameis"]);
// number
```

### 사례 4

- 타입 변수를 제한하기
- 함수를 호출할 때 넘기는 인수를 제한하는 방법

```ts
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123"); // ✅
getLength([1, 2, 3]); // ✅
getLength({ length: 1 }); // ✅
getLength(undefined); // ❌
getLength(null); // ❌
```

- 아래의 경우와 같음
- `T extends {length: number}` : T는 `{length: number}` 객체 타입의 서브 타입이 됨
- length가 number인 InterfaceA를 확장하여 사용하겠다

```ts
interface InterfaceA {
  length: number;
}
interface InterfaceB extends InterfaceA {}
```

# map, forEach 메서드 타입 정의하기

### Map 메서드 타입 정의하기

```ts
 const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  (...)
}

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]
```

### ForEach 메서드 타입 정의하기

```ts
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  (...)
}

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]
```

# 제네릭 인터페이스, 제네릭 타입 별칭

### 제네릭 인터페이스

```ts
interface KeyPair<K, V> {
  key: K;
  value: V;
}

let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};

let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ["1"],
};
```

- 반드시 타입으로 정의할 때 **타입 변수에 할당할 타입을 꺽쇠와 함께 사용**해야 함
- 타입 변수(공식 문서) = 타입 파라미터 = 제네릭 타입 변수 = 제네릭 타입 파라미터

#### 인덱스 시그니처와 함께 사용하기

- 인덱스 시그니처 : key, value 타입 규칙을 기준으로 객체의 type의 타입을 정의할 수 있는 문법

```ts
// 인덱스 시그니쳐
interface NumberMap {
  [key: string]: number;
}
```

```ts
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};
```

### 제네릭 타입 별칭

```ts
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<string> = {
  key: "string",
};
```

### 제네릭 인터페이스 활용 예

```ts
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User<Developer> = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

const studentUser: User<Student> = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

- User 인터페이스를 제네릭 인터페이스로 사용하여 goToSchool에서 프로필을 명시함

# 제네릭 클래스

```ts
class NumberList {
  constructor(private list: number[]) {}

  push(data: number) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new NumberList([1, 2, 3]);
```

- number type의 리스트만 가능한 클래스
- string 타입의 list를 만들기 위해선 클래스를 하나 더 생성해야 함

```ts
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new List([1, 2, 3]);
const stringList = new List(["1", "2"]);
```

#### 주의점

- 제네릭 클래스 : 생성자의 인수로 전달하는 값을 기준으로 타입을 추론함
- 제네릭 인터페이스, 타입 변수 : 앞에다가 타입 명시 필수 !!!

# 프로미스와 제네릭

- 오류가 가장 잘 생기는 api 호출 등의 비동기 처리 코드를 안전하게 사용할 수 있음

### promise 사용하기

- 프로미스의 resolve, reject 값을 자동으로 추론하지 않음 -> 제네릭 사용
- reject의 타입 설정 불가능
- 타입을 정의하지 않으면 기본값 : unknown

```ts
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // 결과값 : 20
    resolve(20);
  }, 3000);
});

promise.then((response) => {
  // response는 number 타입
  console.log(response);
});

promise.catch((error) => {
  if (typeof error === "string") {
    console.log(error);
  }
});
```

#### 프라미스를 반환하는 함수의 타입 정의

```ts
function fetchPost() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 본문",
      });
    }, 3000);
  });
}
```

```ts
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 본문",
      });
    }, 3000);
  });
}
```

- 함수 반환값 타입을 명시하는 방법 추천 : 함수 선언 부분만 봐도 타입을 확인할 수 있기 때문에
