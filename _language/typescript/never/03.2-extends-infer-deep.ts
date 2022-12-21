// docs: https://velog.io/@from_numpy/TypeScript-infer

/** extends infer를 이용해 추론을 이용해 함수의 반환 타입에 의한 타입 생성 **/
type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function fn(num: number) { // Return Type을 명시하지 않은 함수
  return num.toString();
}

// a 변수의 반환 타입이 infer를 이용해 fn 함수의 결과값을 추론한 string 타입으로 설정되었습니다.
const a: CustomReturnType<typeof fn> = "hello";


/** Promise 객체안의 타입 꺼내기 **/
// #NOTE: extends infer의 가장 유용한 학습 방법
// Ex 1)
type UnpackPromiseArray<P> = P extends Promise<infer K>[] ? K : any
const arr = [Promise.resolve(true)];
type ExpectedBoolean = UnpackPromiseArray<typeof arr> // boolean


// Ex 2)
type PromiseType<T> = T extends Promise<infer U> ? U : never;
type A = PromiseType<Promise<number>>; // number, 원시 타입
type B = PromiseType<Promise<string | boolean>> // string | boolean, 유니온 타입
type C = PromiseType<number>; // never, Promise<infer U>에 포함되지 않았기 때문에 U가 아닌 never로 정의됨
type D = PromiseType<Array<string | number>> // never, Promise<infer U>에 포함되지 않았기 때문에 U가 아닌 never로 정의됨
