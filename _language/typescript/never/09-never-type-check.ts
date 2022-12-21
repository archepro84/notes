/** never Type Check Before **/
// type IsNever<T> = T extends never ? true : false;
//
// type Res = IsNever<never>
//
// // 1. TypeScript는 조건부 타입에 대해 자동적으로 Union Type을 할당한다.
// // 2. never는 빈 Union 타입이다.
// // 3. 그러므로 할당이 발생하면 할당할 것이 없으므로 조건부 타입은 never로 평가된다.


/** never Type Check After **/
// source: https://github.com/microsoft/TypeScript/blob/main/tests/cases/conformance/types/conditional/conditionalTypes1.ts#L212

// IsNever에서 암묵적 할당을 막고 타입 매개변수를 Tuple에 Wrapping 하여 해결합니다.
type IsNever<T> = [T] extends [never] ? true : false;

type Res1 = IsNever<never> // true
type Res2 = IsNever<number> // false
