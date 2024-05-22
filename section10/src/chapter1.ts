/* -------------------------------------------- */
/*          Partial, Required, Readonly         */
/* -------------------------------------------- */
/* ------------------ Partial ----------------- */
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

type Partail<T> = {
  [key in keyof T]?: T[key];
};

const draft: Partial<Post> = {
  title: "나중에...",
  content: "수정할거야...",
};

/* ----------------- Required ----------------- */
type Required<T> = {
  [key in keyof T]-?: T[key];
};
const withThumbnailPost: Required<Post> = {
  title: "썸네일을 포함한",
  content: "글이어야 해",
  tags: ["1", "2", "3"],
  thumbnailURL: "썸넬",
};

/* ----------------- Readonly ----------------- */
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};
const readonlyPost: Readonly<Post> = {
  title: "수정이 불가능한",
  content: "글인뎁쇼",
  tags: ["수정불가"],
};
