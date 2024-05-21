/* -------------------------------------------- */
/*               분산적인 조건부 타입                 */
/* -------------------------------------------- */

type StringNumberSwitch<T> = T extends number ? string : number;

let a: StringNumberSwitch<number | string>;
/*
* 1단계
- StringNumberSwitch<number>
- StringNumberSwitch<string>

* 2단계
- string
- number

* 3단계
- 유니언으로 묶임
- string | number
*/

let b: StringNumberSwitch<boolean | 3 | string>;
/*
* 1단계
- StringNumberSwitch<boolean>
- StringNumberSwitch<3>
- StringNumberSwitch<string>

* 2단계
- number
- string
- number

* 3단계
- 유니언으로 묶임
- number | string (순서는 상관 없음)
*/

/* ------------- exclude 조건부 타입 구현 ------------ */
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>;

/* ------------- extract 조건부 타입 구현 ------------ */
type Extract<T, U> = T extends U ? T : never;
type B = Extract<number | string | boolean, string>;

/* -------------- 분산적인 조건부 타입 막기 -------------- */
type StringNumberSwitch2<T> = T extends number ? string : number;
type C = StringNumberSwitch2<3>;

type Exclude2<T, U> = T extends U ? never : T;
type D = Exclude2<2 | "3", number>; // '3'
type E = Exclude2<2 | "3", string>; // 2
