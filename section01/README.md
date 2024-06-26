# 1️⃣ 자바스크립트의 한계점과 타입스크립트

### 모든 프로그래밍 언어에는 타입 시스템이 있다.

- 타입 시스템 : 타입 시스템은 언어의 **타입 관련된 문법 체계**
- 타입 시스템의 종류
  - 동적 타입 시스템 : 자바스크립트, 파이썬
  - 정적 타입 시스템 : C, Java

#### 동적 타입 시스템

- 변수의 타입들을 코드가 실행 되는 도중에 결정
- 미리 변수의 타입을 설정하지 않아도 됨
- 하나의 변수에 담긴 값에 따라 타입이 동적으로 변경될 수 있음 - 변수 하나로 모든 값 활용 가능
- **코드가 실행은 되나**, Type Error로 인한 **예상치 못한 오류** 발생

#### 정적 타입 시스템

- 코드 실행 전 모든 변수의 타입을 고정적으로 결정
- 코드 실행 전에 타입 오류 안내 - 실행 후 오류 X
- 모든 변수에 타입을 지정하는만큼 **코드 양이 상당히 늘어남**

#### 타입스크립트와 점진적 타이핑

- `타입스크립트` : 동적 타입 시스템 + 정적 타입 시스템
- 변수의 타입을 직접 정의하지 않아도 변수에 담기는 **초기값을 기준으로 자동으로 타입을 추론**함
  - 점진적 타입 시스템 : 타입스크립트는 모든 변수의 타입을 일일이 지정할 필요 없음

<br>

# 2️⃣ 타입스크립트의 동작 원리

```js
1️⃣ 나 -> [ 자바스크립트 > AST(추상 문법 트리) > 바이트 코드 ] -> 컴퓨터
2️⃣ 나 -> [ 타입스크립트 > AST(추상 문법 트리) > '타입 검사' > '자바스크립트' ] -> 컴파일 완료 -> 1️⃣ 번 과정 실행
```

- 타입스크립트를 컴파일하여 생성한 자바스크립트 코드는 타입 검사를 통과한, 오류 발생 가능성이 낮은 자스 코드
- 타입스크립트의 타입 관련 코드는 컴파일 결과 모두 사라짐 (프로그램 실행에 영향을 주지 않음)

<br>

# 3️⃣ Hello TS World

### Node.js 패키지 초기화

```bash
npm init
```

### @types/node 설치하기

```bash
npm i @types/node
```

- Node.js 내장 기능들의 타입 정보를 담고있는 @types/node 라는 패키지를 설치
- 설치하지 않으면 Node.js가 제공하는 console 등의 기본 기능(내장 함수 등)들의 타입이 선언되지 않아서 타입스크립트의 컴파일 과정에서 타입 검사가 실패하여 오류가 발생할 수 있음

### 타입스크립트 컴파일러 설치하기

```bash
npm i -g typescript (window)
sudo npm i -g typescript (mac)
tsc -v (버전 확인)
```

- 타입스크립트 컴파일러(TSC)는 npm의 TypeScript 패키지에 동봉되어 있음

#### tsc로 컴파일하고 실행하기

```bash
tsc src/index.ts
```

- 타입스크립트 컴파일러를 통해 src/index.js 파일이 생성됨

#### TSX(TypeScript Execute)로 실행하기

```bash
npm i -g tsx (window)
sudo npm i -g tsx (mac)
tsx src/index.ts
```

- `ts-node`에서 `tsx`로 업데이트 됨
- `tsx` 명령어 한 번으로 타입스크립트 실행시켜주는 도구

<br>

# 4️⃣ 타입스크립트 컴파일러 옵션 설정하기

### 컴파일러 옵션이란

- 얼마나 엄격하게 타입 오류를 검사할 건지
- 컴파일 결과 생성되는 자바스크립트 코드의 버전은 어떻게 할 것인지

### 컴파일러 옵션 자동 생성하기

```bash
tsc --init
```

- Node.js 패키지 단위로 설정
- 대부분 주석처리되어 실행되는 옵션은 별로 없음

### 컴파일러 옵션 직접 설정하기

#### include 옵션

```json
{
  "include": ["src"]
}
```

- tsc에게 컴파일 할 타입스크립트 파일의 범위와 위치를 알려주는 옵션
- 파일이 아주 많을 때 유용함
- `tsc` 입력만하면 해당 경로의 모든 타입스크립트가 컴파일됨

#### target 옵션

```json
{
  "compilerOptions": {
    "target": "ESNext"
  }
}
```

- 컴파일 결과 생성되는 자바스크립트 코드의 버전을 설정
- `ESNext` 자바스크립트 최신 버전

#### module 옵션

```json
{
  "compilerOptions": {
    "module": "CommonJS", // CJS
    "module": "ESNext" // ESM
  }
}
```

- CJS(require) 모듈, ESM(import) 모듈
- 타입스크립트는 ES모듈 시스템과 같음(import, export)

#### outDir

```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

- 컴파일 결과 생성할 자바스크립트 코드의 위치를 결정

#### strict

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

- 컴파일러의 타입 검사 엄격함 수준을 정함
- 타입스크립트에서 매개변수는 개발자가 타입을 정하도록 권장하고 이를 `true`로 오류를 잡을 수 있음
- js를 ts로 마이그레이션하는 경우, 기존 자스 코드가 모두 빨간줄이 되어 대참사가 일어나는데 이럴 때 false로 변경함

#### ModuleDetection 옵션

```json
{
  "compilerOptions": {
    "moduleDetection": "force"
  }
}
```

- 각 파일에서 동일한 스코프, 동일한 이름의 변수를 선언했는지 확인
- 타입스크립트는 모든 모듈을 전역 모듈로 인식함
- 해결방법
  1. `export {}` 모듈 시스템을 사용하는 문법을 한 번 이상 사용하여 격리된 모듈로 인식하게 만들기
  2. `moduleDetection: force` 옵션 추가 (export 키워드가 자동으로 추가됨)

#### ts-node 옵션

```json
"ts-node": {
  "esm": true
},
```

- `tsx`를 사용하면 설정 하지 않아도 됨

#### skipLibCheck 옵션

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

- types 버전이 20버전 이상으로 업데이트되면서 특정 라이브러리에서 타입 검사 오류가 발생함

#### 옵션 모아보기

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
