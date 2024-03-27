// unknown

function unknownExam() {
  let a: unknown = 1; // number -> unknown
  let b: unknown = "hello"; // string -> unknown
  let c: unknown = true; // boolean -> unknown
  let d: unknown = null; // null -> unknown
  let e: unknown = undefined; // undefined -> unknown
  let f: unknown = []; // Array -> unknown
  let g: unknown = {}; // Object -> unknown
  let h: unknown = () => {}; // Function -> unknown

  let unknownValue: unknown;

  let a1: number = unknownValue;
  // 오류 : unknown 타입은 number 타입에 할당할 수 없습니다.
}

let neverVar: never;
let a: number = neverVar; // never -> number
let b: string = neverVar; // never -> string
let c: boolean = neverVar; // never -> boolean
let d: null = neverVar; // never -> null
let e: undefined = neverVar; // never -> undefined
let f: [] = neverVar; // never -> Array
let g: {} = neverVar; // never -> Object

let a2: never = 1; // number -> never ❌
let b2: never = "hello"; // string -> never ❌
let c2: never = true; // boolean -> never ❌
let d2: never = null; // null -> never ❌
let e2: never = undefined; // undefined -> never ❌
let f2: never = []; // Array -> never ❌
let g2: never = {}; // Object -> never ❌
