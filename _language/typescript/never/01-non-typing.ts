/** 오류가 발생하지 않는 Union 타입 힌팅 **/
// type VariantA = {
//   a: number,
// }
// type VariantB = {
//   b: string,
// }
//
// function fn(arg: VariantA | VariantB): void;
// function fn(arg: VariantA | VariantB): void {
//   console.log(typeof arg);
//   console.log(arg);
// }
//
// const input = { a: 84, b: 'foo' }
// fn(input);

/** 오류가 발생하는 Union 타입 힌팅 **/
type VariantA = {
  a: number,
  b?: never,
}
type VariantB = {
  b: string,
  a?: never,
}

function fn(arg: VariantA | VariantB): void;
function fn(arg: VariantA | VariantB): void {
  console.log(typeof arg);
  console.log(arg);
}

const input = { a: 84, b: 'foo' }
// fn(input); // Types of property 'a' are incompatible.
