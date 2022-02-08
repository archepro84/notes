function Enumerable(enumerable: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = enumerable;
    }
}

class Person {
    constructor(private name: string) {}

    @Enumerable(true)
    get getName() {
        return this.name;
    }

    @Enumerable(false)
    set setName(name: string) {
        this.name = name;
    }
}

const person = new Person('Dexter');
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

/*
* L3: 디스크립터의 enumerable 속성을 데코레이터의 인자로 결정합니다.
* L8: name은 외부에서 접근하지 못하는 private 멤버입니다.
* L10~11: 게터 getName 함수는 열거가 가능하도록 합니다.
* L15~16: 세터 setName 함수는 열거가 불가능하도록 합니다.
* L21~24: 결과를 출력하면 getName은 출력되지만 setName은 열거하지 못하게 되었기 때문에 for문에서 key로 받을 수가 없습니다.
* */