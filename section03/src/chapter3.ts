type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

animal = dog; // ✅ OK
// dog = animal; // ❌ NO

// 예시 2
type book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: book;
let ProgrammingBook: ProgrammingBook = {
  name: "한입 크기로 잘라 먹는 리액트",
  price: 33000,
  skill: "reactjs",
};

book = ProgrammingBook; // O
// ProgrammingBook = book; // X

let book2: book = {
  name: "한입 크기로 잘라 먹는 리액트",
  price: 33000,
  // skill: "reactjs",
};
