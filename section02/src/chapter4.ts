// 타입 별칭
type User = {
  id: number;
  name: string;
  age: number;
  location: string;
};

let user: User = {
  id: 1,
  name: "소짱",
  age: 10,
  location: "경기도",
};

let user2: User = {
  id: 2,
  name: "짜장",
  age: 6,
  location: "경기도",
};

// 인덱스 시그니처
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
};

type CountryNumberCodes = {
  [key: string]: number;
};
let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedState: 840,
  unitedKingdom: 826,
};
