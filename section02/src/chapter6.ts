// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

const user1 = {
  name: "소짱",
  role: Role.ADMIN, //관리자
};

const user2 = {
  name: "짜장",
  role: Role.USER, // 회원
};

const user3 = {
  name: "짬뽕",
  role: Role.GUEST, // 게스트
};

// 문자열 열거형
enum Language {
  korean = "ko",
  english = "en",
}

const user = {
  name: "짜장이",
  role: Role.ADMIN, // 0
  language: Language.korean, // "ko"
};
