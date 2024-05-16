/* -------------------------------------------- */
/*       Map, forEach 메서드 타입 정의하기           */
/* -------------------------------------------- */

/* -------------------- Map ------------------- */
const arr = [1, 2, 3];
const newArr = arr.map((it) => it * 2);

function map<T, U>(arr: T[], callback: (item: T) => U) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
const ex1 = map(arr, (it) => it * 3); // number[]
const ex2 = map(["ss", "b"], (item) => item.toUpperCase()); //string[]
const ex3 = map([3, 4], (item) => item.toString()); //string[]

/* ------------------ forEach ----------------- */
const arr2 = [1, 2, 3];
arr2.forEach((it) => console.log(it));

function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach([1, 2, 3], (it) => console.log(it)); // number
forEach(["1", "2", "3"], (it) => console.log(it)); // string
