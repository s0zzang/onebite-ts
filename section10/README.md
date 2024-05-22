# 유틸리티 타입 소개

- 유틸리티 타입 : 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작을 통해 실무에서 자주 사용되는 타입을 미리 만들어 놓은 것
- 타입스크립트가 자체적으로 제공하는 특수한 타입

- 맵드 타입 기반
  - Partial, Required, Readonly, Pick, Omit, Record
- 조건부 타입 기반
  - Exclude, Extract, ReturnType

# Partial, Required, Readonly

### Partial<T>

- 부분적인, 일부분의
- 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입

#### 동기부여

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const draft: Post = {
  // ❌ tags 프로퍼티가 없음
  title: "제목은 나중에 짓자...",
  content: "초안...",
};
```

#### Partail<T> 타입으로 문제 해결하기

```ts
const draft: Partial<Post> = {
  title: "제목 나중에 짓자",
  content: "초안...",
};
```

#### Partail<T> 구현하기

```ts
type PartialUser = {
  [key in keyof User]?: User[key];
};
```

### Required<T>

- 필수의, 필수적인
- 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입

#### 동기부여

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

(...)

// 반드시 썸네일 프로퍼티가 존재해야 하는 게시글
const withThumbnailPost: Post = {
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
  thumbnailURL: "https://...",
};
```

#### Required<T> 타입으로 문제 해결하기

```ts
const withThumbnailPost: Required<Post> = {
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
  thumbnailURL: "https://...",
};
```

#### Required<T> 구현하기

```ts
type Required<T> = {
  [key in keyof T]-?: T[key];
};
```

### Readonly

- 읽기 전용
- 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 만들어주는 타입

#### 동기부여

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

(...)

const readonlyPost: Post = {
  title: "보호된 게시글입니다.",
  tags: [],
  content: "",
};

readonlyPost.content = '해킹당함';
```

#### Readonly<T> 타입으로 문제 해결하기

```ts
const readonlyPost: Readonly<Post> = {
  title: "보호된 게시글입니다.",
  tags: [],
  content: "",
};
```

#### Readonly<T> 구현하기

```ts
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};
```

# Record, Pick, Omit

### Pick<T, K>

- 뽑다, 고르다
- 객체 타입으로부터 특정 프로퍼티 만을 골라내는 타입

#### 동기부여

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

(...)

const legacyPost: Post = { // ❌
  title: "",
  content: "",
};
```

#### Pick로 문제 해결하기

```ts
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "",
  content: "",
};
```

#### Pick 타입 구현하기

```ts
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
```

- `K extends keyof T` : K에 null, never 등의 모든 타입이 들어올 수 있기 때문에 제약 설정

### Omit

- 생략하다, 빼다
- 객체 타입으로부터 특정 프로퍼티를 제거하는 타입

#### 동기부여

```ts
const noTItlePost: Pick<Post, "content" | "tags" | "thumbnailURL"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```

- 프로퍼티가 많을수록 작성해야하는 K 파트가 늘어남

#### Omit으로 문제 해결하기

```ts
const noTItlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```

- title 프로퍼티만 제거한 객체 타입 완성

#### Omit 타입 구현하기

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

- `Exclude` : 앞에 타입 변수에서 뒤에 타입 변수를 제거한 타입 반환
- 이 정도를 이해할 수 있다면 괜찮음

### Record

- 인덱스 시그니처처럼 유연하지만 조금 제한적인 타입
- 동일한 타입을 갖는 객체 타입을 쉽게 정의
- 실무에서 굉장히 자주 사용됨

#### 동기부여

```ts
type Thumbnail = {
  large: {
    url: string;
  };
  medium: {
    url: string;
  };
  small: {
    url: string;
  };
  watch: {
    url: string;
  };
};
```

#### Record로 문제 해결하기

```ts
type Thumbnail = Record<"large" | "medium" | "small", { url: string }>;
```

- 첫번째 타입 변수 : 객체의 프로퍼티 키를 유니언 타입으로 작성
- 두번째 타입 변수 : 키들의 value 타입

#### Record 타입 구현하기

```ts
type Record<K extends keyof any, V> = {
  [key in K]: V;
};
```

- `K extends keyof any`: 어떤 타입이 들어올진 모르겠지만 어떤 객체의 key를 추출한 유니언 타입임을 의미

# Exclude, Extract, ReturnType

### Exclude<T, U>

- 제외하다, 추방하다
- T에서 U를 제거하는 타입

```ts
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<string | boolean, boolean>; // string
```

### Extract<T, U>

- T에서 U를 추출하는 타입

```ts
type Extract<T, U> = T extends U ? T : never;
type B = Extract<string | boolean, boolean>; // boolean
```

### ReturnType<T>

- 함수의 반환값 타입을 추출하는 타입

```ts
type ReturnType<T extends (...args: any)=>any> = T extends (..args: any) => infer R ? R : never

function funcA() {
  return "hello";
}
function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>; // string
type ReturnB = ReturnType<typeof funcB>; // number
```

- `(...args: any)=>any` : 매개변수가 몇개가 들어와도 함수가 되기만 하면 되고 어떤 함수 타입이 들어와도 서브타입으로 조건 충족
