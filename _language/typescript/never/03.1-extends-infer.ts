/** infer를 사용해 조건부 타입 내에 추가 타입 변수를 생성할 경우 모든 infer 키워드에 대해 else 분기를 추가해야 한다. **/
type A = 'foo';
type B = A extends infer C ? (
  C extends 'foo' ? true : false // C는 A를 나타낸다.
  ) : never // 이 분기는 도달할 수 없지만, 생략할 수도 없다.
