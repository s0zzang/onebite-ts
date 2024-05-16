/* -------------------------------------------- */
/*                프로미스와 제네릭                  */
/* -------------------------------------------- */

/* --------------- promise 사용하기 --------------- */
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((res) => {
  console.log(res);
});

promise.catch((err) => {
  console.log(err);
});

/* ----------- 프라미스 함수의 반환값 타입 설정하기 ----------- */
interface Post {
  id: number;
  title: string;
}

// 첫번째 경우
function fetchPost() {
  return new Promise<Post>((res, err) => {
    setTimeout(() => {
      res({
        id: 1,
        title: "게시글",
      });
    }, 3000);
  });
}
// 두번째 경우(더 추천)
function fetchPost2(): Promise<Post> {
  return new Promise((res, err) => {
    setTimeout(() => {
      res({
        id: 1,
        title: "게시글",
      });
    }, 3000);
  });
}
