/* -------------------------------------------- */
/*      제네릭 인터페이스, 제네릭 타입 별칭             */
/* -------------------------------------------- */
/* ----------------- 1. 제네릭 인터페이스 ---------------- */
interface KeyPair<K, V> {
  key: K;
  value: V;
}

let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 3,
};
let keyPair2: KeyPair<boolean, number[]> = {
  key: true,
  value: [3],
};

/* ----------- 1-2. 인덱스 시그니쳐와 함께 사용 ----------- */
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "sdf",
};
let booleanMap: Map<boolean> = {
  key: true,
};

/* --------------- 2. 제네릭 타입 별칭 --------------- */
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<number> = {
  key: 1,
};

/* ------------ 3. 제네릭 인터페이스 활용 예시 ------------ */
interface Student {
  type: "student";
  school: string;
}
interface Developer {
  type: "developer";
  skill: string;
}

// 1️⃣ 타입 가드가 필요한 방법
interface User {
  name: string;
  profile: Student | Developer;
}
// 넘나리 복잡 -> 타입 가드 해야함
function goToSchool(user: User) {
  if (user.profile.type !== "student") return;
  console.log(`${user.profile.school} 가는 중...`);
}

// 2️⃣ 제네릭 인터페이스 활용 방법
interface User2<T> {
  name: string;
  profile: T;
}
function goToSchool2(user: User2<Student>) {
  console.log(`${user.profile.school} 가는 중...`);
}

const developerUser: User = {
  name: "이소정",
  profile: {
    type: "developer",
    skill: "typeScript",
  },
};
const studentUser: User = {
  name: "이소정",
  profile: {
    type: "student",
    school: "서울대",
  },
};
