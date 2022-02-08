import { BadRequestException } from '@nestjs/common';

function MinLength(min: number) {
    return function (target: any, propertyKey: string, parameterIndex: number) {
        target.validators = {
            minLength: function (args: string[]) {
                return args[parameterIndex].length >= min;
            }
        }
    }
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function(...args) {
        Object.keys(target.validators).forEach(key => {
            if (!target.validators[key](args)) {
                throw new BadRequestException();
            }
        })
        method.apply(this, args);
    }
}

class User {
    private name: string;

    @Validate
    setName(@MinLength(3) name: string) {
        this.name = name;
    }
}

const t = new User();
t.setName('Dexter');
console.log('----------')
t.setName('De');


/*
* L3: 파라미터의 최소값을 검사하는 파라미터 데코레이터
* L5~9: target 클래스(여기서는 User)의 validators 속성에 유효성을 검사하는 함수를 할당합니다.
* L6: args 인자는 18번 라인에서 넘겨받은 메서드의 인자입니다.
* L7: 유효성 검사를 위한 로직입니다. parameterIndex에 위치한 인자의 길이가 최소값보다 같거나 큰지 검사합니다.
* L13: 함께 사용할 메서드 데코레이터
* L14: 메서드 데코레이터가 선언된 메서드를 method 변수에 임시 저장해 둡니다.
* L16: 디스크립터의 value에 유효성 검사 로직이 추가된 함수를 할당합니다.
* L17~21: target(User 클래스)에 저장해 둔 validators를 모두 수행합니다.
*         이때 원래 메서드에 전달된 인자(args)들을 각 validator에 전달합니다.
* L22: 원래의 함수를 실행합니다.
* L36: 파라미터 name의 길이가 5이기 때문에 문제가 없습니다.
* L38: 파라미터 name의 길이가 3보다 작기 때문에 BadRequestException이 발생합니다.
* */