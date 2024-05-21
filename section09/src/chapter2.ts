/* -------------------------------------------- */
/*                     infer                    */
/* -------------------------------------------- */

type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
type PromiseA = PromiseUnpack<Promise<number>>;
// T = Promise<number>
type PromiseB = PromiseUnpack<Promise<string>>;
// T = Promise<string>
type PromiseC = PromiseUnpack<string>; // never
// T = string
