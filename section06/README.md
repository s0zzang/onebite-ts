# 자바스크립트의 클래스

- js 파일을 만들면 `tsconfig.json`에 오류 발생
  - javascript도 허용해라 옵션 : `"allowJs" : true`

```ts
let studentA = {
  name: "이소정",
  grade: "A+",
  age: 27,
  study() {
    console.log("열심히 공부 함");
  },
  introduce() {
    console.log("안녕하세요!");
  },
};
let studentB = {
  name: "이승하",
  grade: "B+",
  age: 31,
  study() {
    console.log("열심히 공부 함");
  },
  introduce() {
    console.log("안녕하세요!");
  },
};
```

- 형식이 동일하고 값만 다름 -> 클래스 활용
- 객체 : 붕어빵, 클래스 : 붕어빵 틀

### 클래스 선언하기

- 클래스 : 보통 파스칼 표기법 사용 (대문자로 시작)

```ts
class Student {
  // 필드
  name;
  age;
  grade;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 공부하삼");
  }
  introduce() {
    console.log("하요");
  }
}

// Student 인스턴스
let studentB = new Student("이소정", "A+", 30);
studentB.study();
studentB.introduce();
```

- 인스턴스 : 클래스를 활용해 만든 객체
- 주의점 : 클래스 내부에서 콤마로 구분하지 않음(필드는 세미콜론)

### this 활용하기

```ts
class Student {
  (...)

  introduce() {
    console.log(`안녕하세요 ${this.name} 입니다!`);
  }
}
```

### 상속

```ts
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age); // 부모 클래스의 생성자가 호출됨
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}
```

# 타입스크립트의 클래스

```ts
class Employee {
  // 필드
  name; // 'name' 멤버에는 암시적으로 'any' 형식이 포함됩니다 : 타입을 지정하지 않았고 추론할 정보가 없을 때
  name: string; // 속성 'name'은 이니셜라이저가 없고 생성자에 할당되어 있지 않습니다. : 기본값 설정
  name: string = "";
  age: number = 0;
  position: string = "";

  // 메서드
  work() {
    console.log("일함");
  }
}
```

- 클래스를 만들 땐 객체를 먼저 만들어보면 좋음
- 클래스 필드 선언시 타입 정의 필요
  - 타입을 정의 하지 않으면 암시적으로 'any' 타입으로 추론됨 (오류)
  - `해결 방법1` 암시적 any 허용하는 옵션 : `noImplicitAny": false` (안하는게 좋음)
  - `해결 방법2` 선택적 프로퍼티로 : `name?: string` (좋은 방법 X)
  - `해결 방법3` 타입 정의 + 기본값 설정
  - `해결 방법4` 타입 정의 + 매개변수 타입 설정(기본값을 설정할 값이 마땅히 없다면 유용)

```ts
// 해결 방법 4
class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.positchapter2ion = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}
```

### 클래스는 타입

```ts
class Employee {
  (...)
}

const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};
```

- 구조적 타입 시스템을 따르기 때문에 클래스를 타입으로 활용 가능

### 상속

```ts
class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}
```

- super 생략시 오류

# 접근 제어자 (Access Modifier)

- 클래스의 특정 필드나 메서드를 접근할 수 있는 범위를 설정하는 타입스크립트 기능
- 종류
  - public : 모든 범위에서 접근 가능
  - private : 클래스 내부에서만 접근 가능
  - proteced : 클래스 내부 또는 파생 클래스 내부에서만 접근 가능

### 접근 제어자

```ts
class Employee {
  name: string;
  age: number;
  position?: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  work() {
    console.log("일 중 ...");
  }
}
```

### public

```ts
class Employee {
  public name: string;
  public age: number;
  public position?: string;
}
```

- 기본값
- 어디서든지 프로퍼티에 접근 가능

### private

```ts
class Employee {
  private name: string;
  public age: number;
  public position?: string;

  work() {
    console.log(`${this.name} 일함`); // ⭕️ 메서드에서 private 접근 가능
  }
}

const employee = new Employee("이소정", 30, "개발자");
employee.name = "이소장"; // private이라 Employee 클래스 내에서만 접근 가능
employee.age = 31;
```

- 접근 불가 (읽을 수 조차 없음)
- 접근하고 싶다면? 메서드 내에서 가능

```ts
class ExecutiveOfficer extends Employee {
  officerNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officerNumber: number
  ) {
    super(name, age, position);
    this.officerNumber = officerNumber;
  }

  func() {
    console.log(`${this.name} 일함`); // ❌ 파생 클래스 메서드에서 private 접근 불가능
  }
}
```

### protected

```ts
class Employee {
  protected name: string;
  public age: number;
  public position?: string;
}

class ExecutiveOfficer extends Employee {
  officerNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officerNumber: number
  ) {
    super(name, age, position);
    this.officerNumber = officerNumber;
  }

  func() {
    console.log(`${this.name} 일함`); // ⭕️ 파생 클래스 메서드에서 protected 접근 불가능
  }
}
```

- 외부에서 접근 불가
- 파생 클래스 메서드 안에서 접근 가능

### 필드 생략하기

- constructor 매개변수에 접근 제어자 작성 가능 -> 필드 정의, 초기화 자동으로 됨

```ts
class Employee {
  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}
```

# 인터페이스와 클래스

### 인터페이스를 구현하는 클래스

```ts
// 캐릭터 클래스의 설계도
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private moveName: string // public이 아닌 필드는 따로 작성하기
  ) {}
  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동 !`);
  }
}
```

- implements : 구현하다
- 캐릭터 클래스는 캐릭터 인터페이스를 구현한다.
- interface는 무조건 `public` 필드만 정의가 가능함
  - private 필드가 필요하다면 클래스에 추가하기
