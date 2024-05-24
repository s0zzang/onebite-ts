# 세팅

### 타입 선언 패키지 설치

```bash
npm i @types/node @types/react @types/react-dom @types/jest
```

### tsconfig.json 세팅

```json
{
  "compilerOptions": {
    "target": "ES5", // 리액트 앱 어디서든 잘 동작할 수 있도록
    "module": "CommonJs" // 리액트 앱 어디서든 잘 동작할 수 있도록
  }
}
```

# 오류 해결

### 1. App.js 파일은 입력 파일을 덮어쓰므로 쓸 수 없습니다.

- 원인 : js 확장자 내의 jsx 문법을 해석할 수 없기 때문에 발생
- 해결 : jsx로 확장자 변경

### 2. 기본 내보내기가 없습니다.

- 기본 내보내기 : es module system의 default를 사용해 내보내기를 한 경우
- 원인 : default로 내보낸 값이 없는 모듈에서 기본 내보내기로 호출함
- 해결 : `"esModuleInterop": true` 추가
  ```json
  {
    "compilerOptions": {
      "esModuleInterop": true
    }
  }
  ```

### 3. '--jsx' 플래그를 제공하지 않으면 JSX를 사용할 수 없습니다.

- 원인 : 타입스크립트 컴파일러는 jsx 문법을 해석할 수 없기 때문
- 해결 : `"jsx": "react-jsx"` 추가

  ```json
  {
    "compilerOptions": {
      "jsx": "react-jsx"
    }
  }
  ```

### 4. 'HTMLElement | null' 형식의 인수는 'Container' 형식의 매개 변수에 할당될 수 없습니다.

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
```

- 원인 : `document.getElementById("root")`는 HTMLElement | null 반환이 가능한데, createRoot는 null 타입을 인수로 받지 않기 때문
- 해결 : Non null 단언 또는 타입 단언
  ```js
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  ```

### 타입스크립트로 마이그레이션

- 한번에 파일을 변경하면 방대한 오류를 해결해야 함
- 개별 파일별로 하나씩 하는 것을 추천(js -> jsx -> tsx)
