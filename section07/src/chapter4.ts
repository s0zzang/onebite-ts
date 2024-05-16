/* -------------------------------------------- */
/*                  제네릭 클래스                   */
/* -------------------------------------------- */
/* ---------------- number만 담을 수 있는 Arr ---------------- */
class NumberList {
  constructor(private list: number[]) {}

  push(data: number) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new NumberList([1, 2, 3]);
numberList.pop();
numberList.print();

/* ----------- 모든 타입을 담을 수 있는 Arr ----------- */
class List<T> {
  constructor(public list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }
  pop() {
    this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}

const list = new List([1, 2, 3]);
list.push(3);
list.pop();
list.print();

const list2 = new List(["1", "2", "3"]);
list2.push("3");
list2.pop();
list2.print();
