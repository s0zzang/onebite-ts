/* -------------------------------------------- */
/*               타입 변수 응용하기                  */
/* -------------------------------------------- */

/* ------------------- 사례 1 ------------------- */
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

const [a, b] = swap("1", 2);

a.toFixed();
b.toFixed();
b.toUpperCase();

/* ------------------- 사례 2 ------------------- */
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

const num = returnFirstValue([1, 2, 3]); // 1
const str = returnFirstValue(["a", "s"]); // 'a'
const strNum = returnFirstValue([1, "a", "s"]); // 1 : string | number

/* ------------------- 사례 3 ------------------- */
function returnFirstValue2<T>(data: [T, ...unknown[]]) {
  return data[0];
}
const num2 = returnFirstValue2([1, 2, 3]); // number
const strNum2 = returnFirstValue2([1, "2", "3"]); // number
const strNum3 = returnFirstValue2(["1", 2, 3]); // string

/* ------------------- 사례 4 ------------------- */
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123");
getLength([1, 2, 3]);
getLength({ length: 3 });
getLength({ length: "3" });
getLength(undefined);
getLength(null);
