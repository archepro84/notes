class Animal {
  public bark(): void {
    console.log("bark! bark!");
  }
}

class Dog extends Animal {
  public bark(): void {
    console.log("wal! wal!");
  }
}

const dog = new Dog();
dog.bark(); // wal! wal!