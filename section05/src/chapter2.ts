/* -------------------------------------------- */
/*                   선언합침                     */
/* -------------------------------------------- */
// 중복 선언이 불가능한 타입 별칭과 다르게 인터페이스는 중복 선언 가능

type Person = {
  name: string;
};
type Person = {
  // ❌ Person 식별자가 중복되었습니다.
  age: number;
};

interface Person2 {
  name: string;
}
interface Person2 {
  age: number;
}

/* ----------------- 선언 합침 예시 ----------------- */
const person: Person2 = {
  name: "이소정",
  age: 30,
};

/* ------------------- 주의할 점 ------------------ */
interface Person3 {
  name: string;
}
interface Person3 {
  name: number; // ❌ 충돌 : 선언을 합칠 땐 같은 타입으로 정의해야 함
}
