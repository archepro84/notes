class Person {
  eat(a: string): void;
  eat(a: string, b: string): void;

  eat(a: string, b?: string): void {
    if (a && b) console.log(`I eat ${a} and ${b}`);
    else if (a) console.log(`I eat ${a}`);
  }
}

const person = new Person();
person.eat('apple');
person.eat('apple', 'banana');

/**
 * I eat apple
 * I eat apple and banana
 * */