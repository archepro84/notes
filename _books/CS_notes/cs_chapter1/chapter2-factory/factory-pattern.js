class Latte {
  constructor() {
    this.name = 'latte';
  }
}
class Espresso {
  constructor() {
    this.name = 'espresso';
  }
}

class DefaultCoffeeFactory {
  static createCoffee() {}
}
class LatteFactory extends DefaultCoffeeFactory {
  constructor() {
    super();
  }

  static createCoffee() {
    return new Latte();
  }
}
class EspressoFactory extends DefaultCoffeeFactory {
  constructor() {
    super();
  }

  static createCoffee() {
    return new Espresso();
  }
}

const factoryObj = { LatteFactory, EspressoFactory };
class CoffeeFactory {
  static createCoffee(type) {
    const factory = factoryObj[type];
    return factory.createCoffee();
  }
}

(() => {
  // Latte 클래스의 인스턴스를 생성합니다.
  const coffee = CoffeeFactory.createCoffee('LatteFactory');
  // 커피 이름을 출력합니다.
  console.log(coffee.name);
})();
