function format(formatString: string) {
    return function (target: any, propertyKey: string): any {
        let value = target[propertyKey];

        function getter() {
            return `${formatString} ${value}`;
        }

        function setter(newVal: string) {
            value = newVal;
        }

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        }
    }
}

class Greeter2 {
    @format('Hello')
    greeting: string;
}

const t2 = new Greeter2();
t2.greeting = 'World';
console.log(t2.greeting);

/*
* L6: 게터에서 데코레이터 인자로 들어온 formatString을 원래의 속성과 조합한 스트링으로 바꿉니다.
* L23: 데코레이터에 formatString을 전달합니다.
* L29: 속성을 읽을 때 게터가 호출되면서 Hello World가 출력됩니다.
* */