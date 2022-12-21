function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = "http://www.example.com";
    };
}

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

const bug = new BugReport("Needs dark mode");
console.log(bug);


/*
* L1: 클래스 데코레이터 팩토리입니다.
*     생성자 타입(new (...args: any[]): {}. new 키워드와 함께 어떠한 형식의 인자들도 받을 수 있는 타입)을
*     상속받는 제네릭 타입 T 를 가지는 생성자(constructor)를 팩토리 메서스의 인자로 전달하고 있습니다.
* L2: 클래스 데코레이터는 생성자를 리턴하는 함수여야 합니다.
* L3: 클래스 데코레이터가 적용되는 클래스에 새로운 reportingURL이라는 새로운 속성을 추가합니다.
* */