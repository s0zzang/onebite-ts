/* -------------------------------------------- */
/*              Record, Pick, Omit              */
/* -------------------------------------------- */
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

/* ------------------- Pick ------------------- */
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "",
  content: "",
};

/* ------------------- Omit ------------------- */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// Omit<Post, 'title' extends keyof Post>
// Pick<Post, Exclude<'title' | 'tags' | 'content' | 'thumbnailURL', 'title'>>
// Pick<Post, 'tags' | 'content' | 'thumbnailURL'>
const noTitlePost: Omit<Post, "title"> = {
  tags: [""],
  content: "",
};

/* ------------------ Record ------------------ */
type Thumbnail = {
  large: {
    url: string;
  };
  medium: {
    url: string;
  };
  small: {
    url: string;
  };
};
type Record<K extends keyof any, V> = {
  [key in K]: V;
};
type Thumbnail2 = Record<"large" | "medium" | "small", { url: string }>;
