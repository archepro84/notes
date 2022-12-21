// 함수 반환 값을 never로 설정하였을 때, 함수는 실행이 끝나더라도 제어권을 호출자에게 반환하지 않는다.
function throwError(): never {
  throw new Error();
}

let foo: string | undefined;

// if (!foo) {  throwError();}
// foo;

const guaranteedFoo = foo ?? throwError();
// string, undefined일 경우 throwError가 실행되어 제어권이 반환되지 않아 undefined 타입을 제거함.
