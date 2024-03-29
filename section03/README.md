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

![타입계층도](https://github.com/s0zzang/onebite-ts/assets/109408216/d415f78b-d1ed-4f71-a2f0-952a901ad350)

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

- unknown 타입은 타입 계층도의 **최상단에 위치**
- 모든 타입의 `업 캐스팅`이 가능하여 모든 값 할당 가능
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
- 객체 타입 : 프로퍼티 많을 수록 서브 ! (like 과묵한 대장, 말 많은 부하~)

#### 초과 프로퍼티 검사

```ts
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book2: Book = {
  // 오류 발생
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "react",
};
```

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

#### Union 타입으로 배열 타입

```ts
let arr: (number | string | boolean)[] = [1, "hello", true];
```

#### Union 타입과 객체 타입

```ts
type Dog = {
  name: string;
  color: string;
  cute: boolean;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

// 아래 모두 가능
let union1: Union1 = {
  // ✅ dog를 모두 포함해서 OK
  name: "",
  color: "",
  cute: true,
};

let union2: Union1 = {
  // ✅ person을 모두 포함해서 OK
  name: "",
  language: "",
};

let union3: Union1 = {
  // ✅ person을 모두 포함하기 때문에 color가 추가되어도 OK
  name: "",
  color: "",
  language: "",
};

let union3_2: Union1 = {
  // ✅ dog, person 모두를 포함해서 OK
  name: "",
  color: "",
  language: "",
  cute: false,
};

let union4: Union1 = {
  // ❌ dog, person 중 하나도 모두 포함하지 않기 때문에 X
  name: "",
};
```

- name 프로퍼티만 가진 객체 : dog, person에 모두 포함되지 않음

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

### 타입 추론이란

- 타입스크립트는 타입이 정의되어 있지 않은 변수의 타입을 자동으로 추론함
- `매개변수`는 암시적으로 `any` 타입으로 추론됨

### 타입 추론이 가능한 상황들

- 추론할 정보가 있으면 추론 O
- 추론할 정보가 없으면 추론 X

#### 1. 변수 선언

```ts
let a = 10;
// number 타입으로 추론

let b = "hello";
// string 타입으로 추론

let c = {
  id: 1,
  name: "짜장",
  profile: {
    nickname: "jjang",
  },
  urls: ["https://jjajang.com"],
};
```

- 타입 넓히기 : 범용적으로 변수를 넓게 사용할 수 있도록 추론하는 과정
  - 예시: `let` 키워드로 **할당 없이** 변수 선언

#### 2. 구조 분해 할당

```ts
let { id, name, profile } = c;
let [one, two, three] = [1, "hello", true];
```

#### 3. 함수의 반환값

```ts
function func() {
  return "hello";
}
// 반환값이 string 타입으로 추론
```

- `return`문 뒤에 오는 값을 기준으로 추론

#### 4. 기본값이 설정된 매개변수

```ts
function func(message = "hello") {
  return "hello";
}
```

### 주의해야 할 상황들

#### 1. 암시적으로 any 타입으로 추론

```ts
let d; // 암시적인 any 타입으로 추론
```

- 초기값이 생략된 변수 -> any 타입

```ts
let d; // any
d = 10; // any -> number
d.toFixed();

d = "hello"; // number -> string
d.toUpperCase();
d.toFixed(); // 오류
```

- 값이 할당되면 그 다음 라인부터 해당 값의 타입으로 변화
- `any의 진화` : 암묵적으로 추론된 any 타입이 코드의 흐름에 따라 계속 타입이 변화함
  - 명시적으로 정의한 any 타입과 다름(진화 없음)
  - 협업, 유지보수를 위해 암묵적인 any 비추

#### 2. const 상수의 추론

```ts
const num = 10;
// 10 Number Literal 타입으로 추론

const str = "hello";
// "hello" String Literal 타입으로 추론
```

- 어차피 상수라 다른 값을 담을 일이 없음 -> 리터럴 타입으로 추론됨

### 최적 공통 타입(Best Common Type)

```ts
let arr = [1, "string"];
// (string | number)[] 타입으로 추론
```

- 1과 'string' 타입을 모두 만족해야하기 때문에 유니온 타입으로 추론됨
- 최적의 공통 타입 : 위의 코드에서 유니온 타입

<br>

# 7️⃣ 타입 단언

### 타입 단언

- 타입을 바꾸는 것이 아닌, 타입스크립트 컴파일러를 속이는 것

```ts
type Person = {
  name: string;
  age: number;
};

// 1️⃣
let person: Person = {}; // Error: name, age가 없습니다.
person.name = "";
person.age = 23;

// 2️⃣
let person = {};
person.name = ""; // Error: {} 타입에 name 속성이 없습니다.
person.age = 23; // Error: {} 타입에 age 속성이 없습니다.

// 3️⃣ 타입 단언 : Good
let person = {} as Person;
person.name = "";
person.age = 27;
```

- 나중에 프로퍼티를 초기화하는 경우, 타입이 빈 객체가 되어버림

```ts
type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도", // 추가 프로퍼티
} as Dog;
```

- 타입 단언은 초과 프로퍼티 검사를 피할 때도 사용됨
- 타입을 직접 정의하지 않아도 추론 가능

#### 타입 단언의 조건

```ts
let num1 = 10 as never; // ✅ A(10)가 B(never)의 슈퍼타입
let num2 = 10 as unknown; // ✅ A(10)가 B(unknown)의 슈퍼타입

let num3 = 10 as string; // ❌ A(10)가 B(string)은 형식이 겹치지 않음
```

- 값 as 단언
  - 값이 단언의 슈퍼타입/서브타입이어야 함 = 계층 관계여야 함

#### 다중 단언

```ts
let num3 = 10 as unknown as string;
```

- 좋은걸 알려주는건지 모르겠다고 하심 ㅋㅋ
- 위에선 오류가 났던 계층 구조가 아닌 타입도 단언 가능
- 웬만해선 사용하지 않는 것이 좋음 (이렇게 쓰면 타스를 쓰는 이유가 없음)

#### const 단언

```ts
let num4 = 10 as const;
// 10 Number Literal 타입으로 단언됨

let cat = {
  name: "야옹이",
  color: "yellow",
} as const;
// 모든 프로퍼티가 readonly를 갖도록 단언됨
```

- const로 선언한 것과 동일한 효과를 만들어 줌
- 객체 타입과 함께 사용하면 읽기 전용으로 활용도 굿
  - 프로퍼티에 하나씩 readonly를 작성하지 않아도 됨

#### Non Null 단언

```ts
type Post = {
  title: string;
  author?: string; // 선택적 프로퍼티
};

let post: Post = {
  title: "게시글1",
};

// 옵셔널 체이닝으로 인해 number가 undefined가 되어버렸다 -> number타입이라서 오류 발생
const len: number = post.author?.length;

// Non Null 타입 사용
const len: number = post.author!.length;
```

- 옵셔널 체이닝 : author 프로퍼티가 null, undefined일 경우를 예방
- Non Null (!) : author이 진짜 있어! 라고 타입스크립트 컴파일러가 null, undefined가 있다고 믿게 함
- 조심해서 확실할 때만 사용하기

<br>

# 8️⃣ 타입 좁히기

### 타입 좁히기

- 조건문 등을 이용해 넓은 타입에서 좁은 타입으로 상황에 따라 좁히는 방법

```ts
// value가 number라면 toFixed 실행
// value가 string이라면 toUpperCase 실행
function func(value: number | string) {
  value; // number | string 유니온 타입으로 추론됨
  value.toFixed(); // Error
  value.toUpperCase(); // Error

  if (typeof value === "number") {
    console.log(value.toFixed()); // value가 number으로 보장됨
  } else if (typeof value === "string") {
    console.log(value.toUpperCase()); // value가 string으로 보장됨
  }
}
```

- `typeof` : 타입 가드 (마치 중괄호 안에 들어가지 못하게 지키는 모습)

#### instanceof 타입 가드

```ts
function func(value: number | string | Date | null) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    // typeof value === 'object'인 경우 : null, Data 통과 -> 오류
    console.log(value.getTime());
  }
}
```

- Data(내장 클래스 타입)는 typeof로 구별할 수가 없음 -> instanceof 사용
- 직접 만든 type은 사용 불가(클래스가 아님) -> in 타입 가드 사용

#### in 타입 가드

```ts
type Person = {
  name: string;
  age: number;
};

function func(value: number | string | Date | null | Person) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  } else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age}살 입니다`);
  }
}
```

- value가 null이 아니고, age라는 키가 value에 있는지 조건 검사 -> Person 타입으로 범위가 좁혀짐

<br>

# 9️⃣ 서로소 유니온 타입

- `서로소` : 공약수가 1뿐인 두 정수
- `서로소 유니온 타입` : 교집합이 없는 타입을 모아 만든 유니온 타입
  - 예시: 문자타입 - 숫자타입

### in 연산자의 단점

<img width="481" alt="image" src="https://github.com/s0zzang/onebite-ts/assets/109408216/477b56fd-5e75-425b-9fd7-44bf893c864a">

```ts
type Admin = {
  name: string;
  kickCount: number;
};

type Member = {
  name: string;
  point: number;
};

type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

function login(user: User) {
  if ("kickCount" in user) {
    // Admin
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
  } else if ("point" in user) {
    // Member
    console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
  } else {
    // Guest
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}
```

- kickCount, point가 어떤 타입을 의미하는지 알 수 없음
- 직관적으로 조건을 확인하기 어려움

### 서로소 유니언 타입 활용

<img width="440" alt="image" src="https://github.com/s0zzang/onebite-ts/assets/109408216/1de90dd8-fbbd-4241-a76c-0c1c4d140662">

```ts
type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

function login(user: User) {
  if (user.tag === "ADMIN") {
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
  } else if (user.tag === "MEMBER") {
    console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
  } else {
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}
```

- in 연산자보다 훨씬 직관적
- tag 프로퍼티 추가하여 서로 교집합이 없는 서로소 관계로 바뀜
  - 'ADMIN'이면서 'MEMBER'인 객체가 있을 수 없기 때문에 -> never(공집합)
  - tag 타입을 string literal 타입으로 정의함

### switch문 활용

```ts
function login(user: User) {
  switch (user.tag) {
    case "ADMIN": {
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
      break;
    }
    case "MEMBER": {
      console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
      break;
    }
    case "GUEST": {
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
      break;
    }
  }
}
```

### 서로소 유니언 활용 사례

- 비동기 작업 결과를 처리하는 객체

```ts
type AsyncTask = {
  state: "LOADING" | "FAILED" | "SUCCESS";
  error?: {
    message: string;
  };
  response?: {
    data: string;
  };
};

// 로딩중 : 콘솔에 로딩중 출력
// 실패 : 콘솔에 실패 에러메시지 출력
// 성공 : 콘솔에 성공 데이터 출력
function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("로딩중...");
      break;
    }
    case "FAILED": {
      console.log(`에러발생 : ${task.error?.message}`);
    }
    case "SUCCESS": {
      console.log(`성공 : ${task.response?.data}`);
    }
  }
}

const loading: AsyncTask = {
  state: "LOADING",
};
const failed: AsyncTask = {
  state: "FAILED",
  error: {
    message: "오류 발생 원인은? 모릅니다?",
  },
};
const success: AsyncTask = {
  state: "SUCCESS",
  response: {
    data: "데이터는? 없습니다?",
  },
};
```

- `task.error?.message` 옵셔널 체이닝이 없다면 오류 발생
  - error는 선택적 프로퍼티이기 때문에 에러가 있는지 없는지 확인이 불가능함
  - 좁혀질 타입 자체가 없음
  - 1. 옵셔널 체이닝 또는 Non Null 단언 사용
  - 2. 서로소 유니언 타입으로 만들기

#### 서로소 유니언으로 변경하면?

```ts
type LoadingTask = {
  state: "LOADING";
};

type FailedTask = {
  state: "FAILED";
  error?: {
    message: string;
  };
};

type SuccessTask = {
  state: "SUCCESS";
  response?: {
    data: string;
  };
};

type AsyncTask = LoadingTask | FailedTask | SuccessTask;

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("로딩중...");
      break;
    }
    case "FAILED": {
      console.log(`에러발생 : ${task.error.message}`);
    }
    case "SUCCESS": {
      console.log(`성공 : ${task.response.data}`);
    }
  }
}

const loading: AsyncTask = {
  state: "LOADING",
};
const failed: AsyncTask = {
  state: "FAILED",
  error: {
    message: "오류 발생 원인은? 모릅니다?",
  },
};
const success: AsyncTask = {
  state: "SUCCESS",
  response: {
    data: "데이터는? 없습니다?",
  },
};
```

- state가 각 리터럴이어야 하기 때문에 state가 LOADING인 경우는 로딩 경우밖에 없음(범위 좁히기)
- 여러가지 상태를 표현해야하는 객체에서는 선택적 프로퍼티 보다 타입을 쪼개서 type, state 등의 프로퍼티를 활용하여 서로소 유니언 타입으로 만들기
