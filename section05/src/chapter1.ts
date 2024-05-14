/* -------------------------------------------- */
/*               인터페이스 확장                   */
/* -------------------------------------------- */
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  isBark: boolean;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  name: "string"; // 서브 타입으로만 재정의 가능
  isFly: boolean;
}

/* ---------------- 타입 별칭 확장하기 --------------- */
type Animal2 = {
  name: string;
  color: string;
};

interface Dog2 extends Animal2 {
  name: "짜장이";
  breed: boolean;
}

const dog2: Dog2 = {
  name: "짜장이",
  color: "갈색",
  breed: false,
};

/* ------------------ 다중 확장 ------------------ */
interface DogCat extends Dog, Cat {}
const dogCat: DogCat = {
  name: "",
  age: 5,
  isBark: true,
  isScratch: true,
};
