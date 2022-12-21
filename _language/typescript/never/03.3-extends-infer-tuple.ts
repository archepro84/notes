// docs: https://velog.io/@from_numpy/TypeScript-infer

/** #NOTE Array의 특정 index를 제외한 Conditional Type과 Variadic Tuple Type **/
// type TailOf<T> = T extends [unknown, ...infer U] ? U : [];
//
// // type A = [boolean, number];
// type A = TailOf<[string, boolean, number]>;
//
// const a: A = [true, 2]; // array의 첫번째 인덱스인 string이 제외된 [boolean, number] 타입이 할당됨
// // const a1: A = ['Hello', 123]; // [boolean, number] 타입을 할당하지 않음

/** 함수를 이용해 infer를 이용한 Conditional Type **/
function tailOf<T extends unknown[]>(arr: readonly[unknown, ...T]) {
  const [_ignored, ...rest] = arr; // array의 첫번째 인덱스를 제외한 나머지를 rest에 할당
  return rest; // ...T 타입인 rest를 반환함
}

type A = [string, boolean, number];

const myTailOf: A = ["Hello", true, 123];
const testTailOf = tailOf(myTailOf);
console.log(testTailOf); // [true, 123];