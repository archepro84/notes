/** 객체 타입에서 한 속성을 만을 사용하고 싶을 때 필터링 후 새로운 타입을 생성한다. **/
type Filter<Obj extends Object, ValueType> = { // 1.
  [Key in keyof Obj // 2.
    as ValueType extends Obj[Key] ? Key : never] // 3.
  : Obj[Key] // 4.
}

// 1. 첫번째 인자로 Object 타입인 Obj와 두번째 인자로 해당 객체에서 사용할 ValueType을 입력받는다
// 2. 첫번째 인자로 입력받은 Obj의 모든 Key 속성을 순회한다.
// 3. 두번째 인자로 입력받은 ValueType이 Obj의 Key 속성의 값과 같다면 Key를 반환하고 아니라면 never를 반환한다. (해당 키를 제외한다.)
// 4. Obj의 Key에 해당하는 Value를 반환한다.

interface Foo {
  name: string;
  id: number;
  age: number;
  nickname: string;
}

type Filtered = Filter<Foo, string>; // { name: string, nickname: string }


