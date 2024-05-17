/* -------------------------------------------- */
/*                   맵드 타입                    */
/* -------------------------------------------- */
interface User {
  id: number;
  name: string;
  age: number;
}

function fetchUser(): User {
  return {
    id: 1,
    name: "소정",
    age: 10,
  };
}

function updateUser(user: PartialUser) {
  // 유저 정보 수정 기능
}

updateUser({
  age: 100, // 수정한 age만 보내고 싶은데 User의 모든 값이 필수값임
});

/* ---------------- ❌ 중복된 타입 선언 --------------- */
// 수정된 프로퍼티만 updateUser로 데이터를 보내기 위해 선택항목인 타입 하나 추가하기
interface PartialUser {
  id?: number;
  name?: string;
  age?: number;
}

/* ---------------- ⭕️ 맵드 타입 선언 --------------- */
type PartialUser2 = {
  [key in "id" | "name" | "age"]: User[key];
};
type PartialUser3 = {
  [key in keyof User]?: User[key];
};
type PartialUser4 = {
  readonly [key in keyof User]: string;
};
