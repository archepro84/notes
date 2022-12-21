function HandleError() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target)
        console.log(propertyKey)
        console.log(descriptor)

        const method = descriptor.value;

        descriptor.value = function() {
            try {
                method();
            } catch (e) {
                // 에러 핸들링 로직 구현
                console.log(e);
            }
        }
    };
}

// interface PropertyDescriptor {
//     configurable?: boolean;  // 속성의 정의를 수정할 수 있는지 여부
//     enumerable?: boolean;    // 열거형인지 여부
//     value?: any;             // 속성 값
//     writable?: boolean;      // 수정 가능 여부
//     get?(): any;             // getter
//     set?(v: any): void;      // setter
// }

class Greeter {
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const t = new Greeter();
t.hello();

/*
  함수를 실행하는 과정에서 에러가 발생했을 때 이 에러를 처리하는 로직
* L2: 메서드 데코레이터가 가져야 하는 3개의 인자입니다.
*     PropertyDescriptor는 객체 속성의 특성을 기술하고 있는 객체로써 enumerable 외에도 여러가지 속성을 가지고 있습니다.
*     enumerable이 true가 되면 이 속성은 열거형이라는 뜻이 됩니다.
* L3: 출력결과는 {constructor: ƒ, greet: ƒ} 입니다.
*     데코레이터가 선언된 메서드 greet가 속해있는 클래스의 생성자와 프로토타입을 가지는 객체임을 알 수 있습니다.
* L4: 함수이름 hello가 출력됩니다.
* L5: hello 함수가 처음 가지고 있던 디스크립터가 출력됩니다.
*     출력결과는 {value: ƒ, writable: true, enumerable: false, configurable: true} 입니다.
* L7: 디스크립터의 value 속성으로 원래 정의된 메서드를 저장합니다.
* L10: 원래의 메서드를 호출합니다.
* L12: 만약 원래의 메서드를 수행하는 과정에서 발생한 에러를 핸들링하는 로직을 이 곳에 구현합니다.
* L13: Error: 테스트 에러가 출력됩니다.
*/