# 타입 조작하기

- 타입 조작 : 기본 타입이나 별칭 또는 인터페이스로 만든 원래 존재하던 타입들을 상황에 따라 유동적으로 다른 타입으로 변환하는 타입스크립트의 강력하고도 독특한 기능
  - 가변적인 타입을 설정할 수 있는 제네릭도 포함됨

0. 제네릭
1. 인덱스드 엑세스 타입 : 객체, 배열, 튜플타입에서 특정 프로퍼티/요소 타입 추출
2. keyof 연산자 : 객체 타입으로부터 프로퍼티 키들을 모두 스트링 리터럴 유니온 타입으로 추출
3. Mapped 타입 : 기존 객체 타입으로부터 새로운 객체 타입을 만드는 타입
4. 템플릿 리터럴 타입 : 스트링 리터럴 타입을 기반으로 정해진 패턴의 문자열만 포함하는 타입
5. 조건부 타입

# 인덱스드 엑세스 타입

- 객체, 배열, 튜플에 모두 사용 가능
- 복잡하고 큰 타입으로부터 필요한 만큼만 잘게 타입을 뽑아낼 수 있음

### 객체 프로퍼티의 타입 추출하기

```ts
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}

// 1️⃣ 직접 타입 지정하기
function printAuthorInfo(author: { id: number; name: string }) {
  console.log(`${author.id} - ${author.name}`);
}

// 2️⃣ 인덱스드 엑세스 타입 활용하기
function printAuthorInfo(author: Post["author"]) {
  console.log(`${author.id} - ${author.name}`);
}

const post: Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
  },
};
```

- 주의점
  1. `Post["author"]` - 'author'는 **값이 아닌 타입**
  2. 존재하지 않는 프로퍼티 작성 불가
- (응용) author의 id만 가져오고 싶을 때 : `Post["author"]["id"]`

### 배열 요소의 타입 추출하기

- 특정 요소 뽑아내기 가능

```ts
type PostList = {
  title: "게시글 제목";
  content: "게시글 본문";
  author: {
    id: 1;
    name: "이정환";
  };
}[];

function printAuthorInfo(author: Post[number]["author"]) {
  console.log(`${author.id} - ${author.name}`);
}

const post: PostList[number] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
  },
};
```

- PostList[number] 가능
- PostList[0] 가능

### 튜플의 요소 타입 추출하기

```ts
type Tup = [number, string, boolean];

type Tup0 = Tup[0];
// number

type Tup1 = Tup[1];
// string

type Tup2 = Tup[2];
// boolean

type Tup3 = Tup[number];
// number | string | boolean
```

- Tup[number] : 가장 최적의 공통 타입 = 유니온 타입

# keyof 연산자

- 객체 타입으로부터 프로퍼티의 모든 key들을 String Literal Union 타입으로 추출하는 연산자

```ts
interface Person {
  name: string;
  age: number;
}

// ❌ 직접 모든 키를 나열하는 방법
function getPropertyKey(person: Person, key: "name" | "age") {
  return person[key];
}
// ⭕️ keyof 연산자를 사용하는 방법
function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

### Typeof와 Keyof 함께 사용하기

```ts
type Person = typeof person;

function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

# 맵드 타입

- 객체 타입 기반으로 새로운 객체 타입 만드는 타입 조작 기능
- 실무에서 많이 사용함(인터페이스를 활용할 때 많이 쓰면 될듯?)
- 인터페이스에서는 사용 불가

```ts
interface User {
  id: number;
  name: string;
  age: number;
}
type PartialUser = {
  id?: number;
  name?: string;
  age?: number;
};

// 서버에 있는 user 정보 불러오기
function fetchUser(): User {
  return {
    id: 1,
    name: "이소정",
    age: 27,
  };
}

// 한 명의 유저 정보 수정하는 기능
function updateUser(user: PartialUser) {
  // ... 유저 정보 수정 기능
}

// 매개변수 user의 타입이 User이기 때문에 원하는 프로퍼티만 보낼 수가 없음
updateUser({
  id: 1,
  name: "이소정",
  age: 20,
});
```

- User, PartialUser가 완전 중복 : 맵드 타입이 필요한 상황 !

```ts
type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key];
  [key in keyof User]?: User[key];
};
```

- 인터페이스로 맵드 타입 생성 불가
- `key` : in 연산자, string literal union 타입
  - 키가 id, name, age일 수 있음
  - 인덱스 시그니처는 in이 아닌 콜론 사용
- `value` : 인덱스드 엑세스 타입
  - id: User['id'] = number
  - name: User['name'] = string
  - age: User['age'] = number
- 맵드 타입을 통해 모든 프로퍼티가 선택적 프로퍼티가 되게 함

#### 예시 1 : 타입이 동일한 경우

```ts
type BooleanUser = {
  [key in "id" | "name" | "age"]: boolean;
  [key in keyof User]: boolean;
};
```

#### 예시 2 : readonly

```ts
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};
```

# 템플릿 리터럴 타입

- 타입 조작 기능들 중 가장 단순한 기능
- 템플릿 리터럴을 이용해 특정 패턴을 갖는 String 타입을 만드는 기능
- 문자열로 여러가지 상황을 표현해야하는 경우 사용됨

```ts
type Color = "red" | "black" | "green";
type Animal = "dog" | "cat" | "chicken";

type ColoredAnimal = `red-dog` | 'red-cat' | 'red-chicken' | 'black-dog' ... ;

type ColoredAnimal = `${Color}-${Animal}`;
```
