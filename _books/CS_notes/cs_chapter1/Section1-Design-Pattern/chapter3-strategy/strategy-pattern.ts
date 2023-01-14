interface PaymentStrategy {
  pay(amount: number): void;
}

class KAKAOCardStrategy implements PaymentStrategy {
  private readonly name: string;
  private readonly cardNumber: string;
  private readonly cvv: string;
  private readonly dateOfExpiry: string;

  constructor(name: string, cardNumber: string, cvv: string, expiryDate: string) {
    this.name = name;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.dateOfExpiry = expiryDate;
  }

  public pay(amount: number): void {
    console.log(`${amount} paid using KAKAOCard`);
  }
}

class LUNACardStrategy implements PaymentStrategy {
  private readonly emailId: string;
  private readonly password: string;

  constructor(emailId: string, password: string) {
    this.emailId = emailId;
    this.password = password;
  }

  public pay(amount: number): void {
    console.log(`${amount} paid using LUNACard`);
  }
}

class Item {
  private readonly name: string;
  private readonly price: number;

  constructor(name: string, cost: number) {
    this.name = name;
    this.price = cost;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

class ShoppingCart {
  private items: Array<Item>;

  constructor() {
    this.items = [];
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  removeItem(item: Item): void {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  calculateTotal(): number {
    let sum = 0;
    for (const item of this.items) {
      sum += item.getPrice();
    }
    return sum;
  }

  pay(paymentMethod: PaymentStrategy): void {
    const amount = this.calculateTotal();
    paymentMethod.pay(amount);
  }
}

(() => {
  const cart = new ShoppingCart();

  const a = new Item("ItemA", 100);
  const b = new Item("ItemB", 300);

  cart.addItem(a);
  cart.addItem(b);

  // pay by LUNA Card
  cart.pay(new LUNACardStrategy(
    "archepro84@gmail.com",
    "archeproPassword"
  ));

  // pay by KAKAO Card
  cart.pay(new KAKAOCardStrategy(
    "이용우",
    "4890-1010-2013-8484",
    "991",
    "23/02"
  ));
})()