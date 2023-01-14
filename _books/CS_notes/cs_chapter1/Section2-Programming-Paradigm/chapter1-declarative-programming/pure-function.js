/** 순수 함수(Pure Function) **/
function pure(a, b) {
  return a + b;
}

console.log(pure(1, 2)); // 3


/** 비 순수 함수(Non-Pure Function **/
const c = 1000;
function nonPure(a, b) {
  return a + b + c;
}

console.log(nonPure(1, 2)); // 1003