let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["hello", "im", "winterlood"];

let boolArr: Array<boolean> = [true, false, true];

// 배열 내 다양한 타입 존재
let multiArr: (string | number)[] = [1, "hello"];

// 깊은 배열
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];

// 튜플
let tup1: [number, number] = [1, 2];
// tup1 = [1, 2, 3] ❌

let tup2: [number, string, boolean] = [1, "ss", false];
