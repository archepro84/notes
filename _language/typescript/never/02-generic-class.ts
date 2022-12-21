/** Generic Class의 의도치 않은 API 사용 방지 Before **/
// type Read = {}
// type Write = {}
//
// // const toWrite: Write = {};
// //
// // class MyCache<T, R> {
// //   put(val: T): boolean {
// //     return true;
// //   }
// //
// //   get(): R {
// //     return {} as R;
// //   }
// // }
//
// declare const toWrite: Write;
//
// declare class MyCache<T, R> {
//   put(val: T): boolean;
//
//   get(): R;
// }
//
// const cache = new MyCache<Read, Write>();
// cache.put(toWrite);

/** Generic Class의 의도치 않은 API 사용 방지 After **/
type Read = {}
type Write = {}


declare const toWrite: Write;

declare class MyCache<T, R> {
  put(val: T): boolean;

  get(): R;
}

declare class ReadOnlyCache<R> extends MyCache<never, R> {
}

const readonlyCache = new ReadOnlyCache<Read>();
const data: any = "hello";
// readonlyCache.put(data); // Argument of type 'any' is not assignable to parameter of type 'never'.