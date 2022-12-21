/** 다형성 함수 입력 **/
type ReturnTypeByInputType = {
  int: number
  char: string
  bool: boolean
}

// number, string, boolean의 교차 타입은 호환되지 않으므로 never가 할당된다.
function getRandom<T extends 'char' | 'int' | 'bool'>(
  str: T
): ReturnTypeByInputType[T] {
  if (str === 'int') {
    // generate a random number
    // return Math.floor(Math.random() * 10) // ❌ 'number' 타입은 'never'타입에 할당할 수 없다.
    return Math.floor(Math.random() * 10) as ReturnTypeByInputType[T] // ✅
  } else if (str === 'char') {
    // generate a random char
    // return String.fromCharCode(
    //   97 + Math.floor(Math.random() * 26) // ❌ 'string' 타입은 'never'타입에 할당할 수 없다.
    // )
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ) as ReturnTypeByInputType[T] // ✅
  } else {
    // generate a random boolean
    // return Boolean(Math.round(Math.random())) // ❌ 'boolean' 타입은 'never'타입에 할당할 수 없다.
    return Boolean(Math.round(Math.random())) as ReturnTypeByInputType[T] // ✅
  }
}

/** 타입 교차와 never 타입 **/
// function f1(obj: { a: number, b: string }, key: 'a' | 'b') {
//   obj[key] = 1; // 'number' 타입은 'never' 타입에 할당할 수 없다.
//   obj[key] = 'x'; // 'string' 타입은 'never' 타입에 할당할 수 없다.
// }