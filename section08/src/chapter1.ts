/* -------------------------------------------- */
/*              인덱스드 엑세스 타입                 */
/* -------------------------------------------- */
// 인덱스를 통해 다른 타입 내의 특정 프로퍼티/요소 추출

/* -------------- 1. 객체 프로퍼티 타입 추출하기 ------------- */
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}
const post: Post = {
  title: "제목",
  content: "컨텐츠",
  author: {
    id: 1,
    name: "소정",
  },
};
function printAuthorInfo(author: { id: number; name: string }) {
  console.log(`${author.id}-${author.name}`);
}
function printAuthorInfo2(author: Post["author"]) {
  console.log(`${author.id}-${author.name}`);
}

/* --------------- 2. 배열 요소 추출하기 -------------- */
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}[];
const postList: PostList[0] = {
  title: "제목",
  content: "컨텐츠",
  author: {
    id: 1,
    name: "소정",
  },
};

/* ------------- 3. 튜플 요소 타입 추출하기 ------------- */
type Tub = [number, string, boolean];
type Tub0 = Tub[0]; // number
type Tub1 = Tub[1]; // string
type Tub2 = Tub[2]; // boolean
type Tub3 = Tub[number]; // string | number | boolean
