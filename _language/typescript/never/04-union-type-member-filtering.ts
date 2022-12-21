/** Union Type에서 멤버 필터링 **/
type Foo = {
  name: 'foo'
  id: number
}

type Bar = {
  name: 'bar'
  id: number
}

type All = Foo | Bar
type ExtractTypeByName<T, G> = T extends { name: G } ? T : never;

type ExtractedType = ExtractTypeByName<All, 'foo'>; // Return Type: Foo
const a1: ExtractedType = { name: 'foo', id: 1 };

type ExtractedTypeByBar = ExtractTypeByName<All, 'bar'>; // Return Type: Bar
const a2: ExtractedTypeByBar = { name: 'bar', id: 2 };

type ExtractedTypeByNever = ExtractTypeByName<All, '##Never##'>; // Return Type: never
// const a3: ExtractedTypeByNever = { name: '##Never##', id: 3 }; // Error: Type 'never' is not assignable to type 'ExtractedTypeByNever'.


/** ExtractedType의 전개 로직 **/
// 1. All 타입에 할당된 타입은 Union Type에 걸쳐 할당됩니다.
declare type Name = 'foo';
type ExtractedType1 = ExtractTypeByName<All, Name>;

// 2. All, Name 타입에 할당된 값들이 분리됩니다.
type ExtractedType2 = ExtractTypeByName<Foo | Bar, 'foo'> // All = Foo | Bar, Name = 'foo'

// 3. Foo | Bar 타입이 Union Type에 걸쳐 분리됩니다.
type ExtractedType3 = ExtractTypeByName<Foo, 'foo'> | ExtractTypeByName<Bar, 'foo'>

// 4. ExtractTypeByName 타입의 구현을 대체하고, 개별적으로 평가하도록 분리합니다.
type ExtractedType4 =
  Foo extends { name: 'foo' } ? Foo : never // => Foo
    | Bar extends { name: 'foo' } ? Bar : never // => never

// 5. ExtractedType4 타입을 개별적으로 평가합니다.
type ExtractedType5 = Foo | never

// 6. Union Type에서 never 타입을 제거합니다.
type ExtractedType6 = Foo