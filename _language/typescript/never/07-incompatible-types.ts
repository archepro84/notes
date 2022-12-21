// 호출 되지 않는 타입을 & 연산자를 이용해 never 타입을 반환받습니다.
type Res = number & string // never

// 아무 타입과 never 타입을 교차해서 never 타입을 반환받습니다.
type Res2 = number & never // never

/** name = never, string과 number가 판별 속성이 아니기 때문에 name만 never **/
// type Foo = {
//   name: string,
//   age: number,
// }
//
// type Bar = {
//   name: number,
//   age: number,
// }
//
// type Baz = Foo & Bar // { name: never, age: number }
// // const baz: Baz = { age: 27 } // Error: Property 'name' is missing in type '{ age: number; }' but required in type 'Baz'.


/** Baz = never, Boolean이 true/false의 Union Type이기 때문에 Baz = never로 축소된다. **/
type Foo = {
  name: boolean,
  age: number,
}

type Bar = {
  name: number,
  age: number,
}

type Baz = Foo & Bar // never
// const baz: Baz = undefined; // Error: Type 'undefined' is not assignable to type 'never'.