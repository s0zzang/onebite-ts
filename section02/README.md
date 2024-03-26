# 1️⃣ 기본 타입이란?

- 타입스크립트가 자체적으로 제공하는 타입 (내장 타입)
- 자스에는 없는 타입 : unknown, any, void, never

### 환경 세팅

```bash
npm init
npm i @types/node
```

- 타입스크립트 옵션 설정
- package.json 파일에 `type: module` 추가

<br>

# 2️⃣ 원시타입과 리터럴타입

### 원시타입

- 딱 하나의 값만 저장할 수 있음
- `: number` 타입 주석, type annotation
  - 변수의 타입을 정의하는 방식
- number 타입으로 선언한 변수에는 number만 담을 수 있음

#### number 타입

```ts
// number
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;

num1 = "hello"; // ❌
num1.toUpperCase(); // ❌
```

- 자바스크립트의 **숫자를 의미하는 모든 값**이 포함됨

#### string 타입

```ts
// string
let str1: string = "hello";
let str2: string = "hello";
let str3: string = `hello`;
let str4: string = `hello ${str1}`;
```

#### boolean 타입

```ts
// boolean
let bool1: boolean = true;
let bool2: boolean = false;
```

#### null 타입

```ts
// null
let null1: null = null;
```

- 개발자가 의도적으로 잠시 비워둔 값을 null로 명시하는 경우
  - `"strictNullChecks": false` 컴파일러 옵션 추가하여 추후 다른 타입 할당 가능

#### undefined 타입

```ts
// undefined 타입
let unde1: undefined = undefined;
```

### 리터럴 타입

```ts
let numA: 10 = 10; // 10 외의 다른 숫자도 재할당 금지
let strA: "hello" = "hello";
let boolA: true = true;
let boolB: false = false;
```

- 값 그 자체가 타입이 되는 경우
- 복합 타입을 만들 때 유용하게 사용될 예정

<br>

# 3️⃣ 배열과 튜플

### 배열

#### 배열 타입 정의 방법

```ts
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["hello", "im", "winterlood"];
let boolArr: Array<boolean> = [true, false, true];
```

- 제네릭 문법 : 꺽쇠와 함께 타입을 작성하는 문법
- 기능은 동일하여 선호에 따라 선택

#### 다양한 타입 요소를 갖는 배열 타입 정의하기

```ts
let multiArr: (number | string)[] = [1, "hello"];
```

- 타입을 잘 모르겠을 땐 마우스 올려보기 : 점진적 타입 시스템을 통해 자동 추론하기 때문에 참고할 수 있음

#### 다차원 배열 타입 정의하기

```ts
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];
```

### 튜플

```ts
let tup1: [number, number] = [1, 2];
// tup1 = [1, 2, 3] ❌
```

- 자바스크립트에는 없는 타입스크립트의 특수한 타입
- 길이와 타입이 고정된 배열
- 별도로 존재하는 자료형은 아니고 결국 컴파일 될 때 배열로 변환됨
- 결국 배열이기 때문에 push, pop 사용 가능함(고정된 길이 무시됨)

#### 튜플 사용 예시

```ts
const users = [
  ["소짱", 1],
  ["이민지", 2],
  ["김민지", 3],
  ["박민지", 4],
  [5, "최민지"],
];
```

- 배열 인덱스 순서를 지키는 것이 중요할 때 관련 오류를 미리 잡을 수 있음

<br>

# 4️⃣ 객체

### 객체 타입을 정의하는 방법

#### object로 정의하기

```ts
let user: object = {
  id: 1,
  name: "짜장이",
};
user.id; // 'object' 형식에 'id' 속성이 없습니다.
```

- 객체의 타입을 object로 정의하면 생기는 문제점 : 점표기법 접근시 프로퍼티가 없다고 표시됨
- object 정의 : 객체이긴한데 ... 이상은 몰라
- `객체 리터럴` 타입으로 정의해야 함

#### 객체 리터럴 타입

```ts
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "짜장이",
};

user.id;
```

- 프로퍼티의 타입을 정의해야 함
- 구조적 타입 시스템 `{ .. } = { .. }`
  - 프로퍼티를 기준으로 구조적 타입을 정의함
  - 명목적 타입 시스템 : 이름을 기준으로 타입 정의

### 특수한 프로퍼티 정의하기

#### 선택적 프로퍼티(Optional Property)

```ts
let user: {
  id?: number;
  name: string;
} = {
  id: 1,
  name: "짜장이",
};

user = {
  name: "제로콜라",
};
```

- ?의 의미 : optional 프로퍼티

#### 읽기전용 프로퍼티(Readonly Property)

```ts
let config: {
  readonly apiKey: string;
} = {
  apiKey: "my api key",
};
```

<br>

# 5️⃣ 타입 별칭과 인덱스 시그니처

### 타입 별칭

- 타입 별칭 : 타입을 마치 변수처럼 정의해서 사용

#### 타입 별칭 사용 전

```ts
let user: {
  id: number;
  name: string;
  age: number;
  location: string;
} = {
  id: 1,
  name: "소짱",
  age: 10,
  location: "경기도",
};

let user2: {
  id: number;
  name: string;
  age: number;
  location: string;
} = {
  id: 2,
  name: "짜장",
  age: 6,
  location: "경기도",
};
```

- 타입을 지정하다보니 같은 내용을 반복해서 작성하게 됨 ...

#### 타입 별칭 사용 후

```ts
type User = {
  id: number;
  name: string;
  age: number;
  location: string;
};

let user: User = {
  id: 1,
  name: "소짱",
  age: 10,
  location: "경기도",
};

let user2: User = {
  id: 2,
  name: "짜장",
  age: 6,
  location: "경기도",
};
```

#### 타입 별칭 주의점

- 스코프 내에서 중복되지 않아야 함
- 타입 별칭은 컴파일 과정에서 모두 사라짐

### 인덱스 시그니처

- 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법

#### 인덱스 시그니처 사용 예시

- 프로퍼티가 200개가 넘는다면 프로퍼티 타입 200번 정의해야 함
- 키와 밸류의 규칙을 기준으로 타입을 정의함

```ts
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
};
```

#### 주의점

- type 규칙을 위반하지만 않으면 에러가 발생하지 않음 -> 프로퍼티가 하나도 없어도 에러 발생 X
- 필수값은 추가로 작성하기

  ```ts
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: number;
  };
  ```

- 추가 프로퍼티의 밸류는 인덱스 시그니처의 밸류 타입과 일치/호환해야 함

  ```ts
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: string; // 오류!
  };
  ```

  <br>

# 6️⃣ 열거형 타입

### 열거형(Enum) 타입

```ts
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}
```

- 자바스크립트에는 존재하지 않고 오직 타입스크립트에서만 사용하는 특별한 타입
- 여러 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
- `=` 없이 바로 중괄호 사용 !

#### 숫자형 enum (자동 할당)

```ts
enum Role {
  ADMIN, // 0 할당(자동)
  USER, // 1 할당(자동)
  GUEST, // 2 할당(자동)
}

enum Role {
  ADMIN = 10, // 10 할당
  USER, // 11 할당(자동)
  GUEST, // 12 할당(자동)
}

enum Role {
  ADMIN, // 0 할당
  USER = 10, // 11 할당(자동)
  GUEST, // 12 할당(자동)
}
```

### 문자열 열거형

```ts
enum Language {
  korean = "ko",
  english = "en",
}

const user = {
  name: "짜장이",
  role: Role.ADMIN, // 0
  language: Language.korean, // "ko"
};
```

- Ko인지, Korea인지 헷갈리는 경우에도 language로 바로 확인이 가능함

### enum은 컴파일 결과 객체가 된다.

- enum은 컴파일 과정에서 사라지지 않음
  ```ts
  var Role;
  (function (Role) {
    Role[(Role["ADMIN"] = 0)] = "ADMIN";
    Role[(Role["USER"] = 1)] = "USER";
    Role[(Role["GUEST"] = 2)] = "GUEST";
  })(Role || (Role = {}));
  ```

<br>

# 7️⃣ any와 unknown

### any 타입

```ts
let anyVar: any = 10;
anyVar = "hello";
```

- 타입스크립트는 변수의 타입을 자동 추론하여 다른 타입을 재할당하면 오류가 발생함
- 타입스크립트에서만 제공되는 특별한 타입
- **타입 검사를 받지 않는** 특수한 치트키 타입

#### any 타입 특징

```ts
let anyVar: any = 10;
anyVar = "hello";
anyVar = {};

anyVar.toUpperCase(); // 함수에 toUpperCase 사용 불가 - 런타임에 오류 발생

let num: number = 10;
num = anyVar; // 모든 타입 변수에 any 타입 할당 가능
```

- 모든 타입의 메서드 제약 없이 사용 가능
- 모든 타입의 변수에 any 타입 할당 가능

#### any는 최대한 사용 지양

- 런타임에 오류를 발생함

### Unknown 타입

```ts
let unknownVar: unknown;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};
```

- any 타입과 비슷하지만 보다 안전한 타입

#### any 타입과의 차이점

```ts
let num: number = 10;
(...)

let unknownVar: unknown;
unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

num = unknownVar; // 오류 !
unknownVar * 2 // 오류 !
```

- 메서드, 연산 사용 불가
- 모든 타입의 변수에 unknown 타입 할당 불가

#### 사용 방법

```ts
if (typeof unknownVar === "number") {
  // 이 조건이 참이된다면 unknownVar는 number 타입으로 볼 수 있음
  unknownVar * 2;
}
```

<br>

# 8️⃣ void와 never

### void

```ts
function func1(): string {
  return "hello";
}
function func2(): void {
  console.log("hello");
}

let a: void;
a = undefined;
```

- 아무런 값도 없음을 의미하는 타입
- undefined 외의 다른 타입을 담을 수 없음
  - `strictNullChecks` 해제하면 null 타입까지만 담을 수 있음

#### undefined, null이 있는데 void가 등장한 이유 (5.0 이전 해당)

- 함수의 반환값을 `undefined`로 설정하면 진짜 `undefined`를 반환해야 함
- 함수의 반환값을 `null`로 설정하면 진짜 `null`을 반환해야 함

### never 타입

```ts
function func3(): never {
  while (true) {}
}

function func4(): never {
  throw new Error();
}
```

- 불가능을 의미하는 타입
- func3 함수처럼 영원히 종료되지 않는 함수는 반환할 수 없음 -> never
- func4 함수처럼 의도적으로 오류를 발생시켜 프로그램이 중지됨 -> never
- 어떤 타입의 값도 담을 수 없음(심지어 any도)
