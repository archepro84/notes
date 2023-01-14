interface Observer {
  update(): void;
}

interface Subject {
  register(obj: Observer): void;

  unregister(obj: Observer): void;

  notifyObservers(): void;

  getUpdate(obj: Observer): string;
}

// Topic: Observer 패턴의 주체이자 객체
class Topic implements Subject {
  private observers: Set<Observer>;
  private message: string;

  constructor() {
    this.observers = new Set;
    this.message = "";
  }

  register(obj: Observer): void {
    if (!this.observers.has(obj)) this.observers.add(obj);
  }

  unregister(obj: Observer): void {
    this.observers.delete(obj);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }

  getUpdate(obj: Observer): string {
    return this.message;
  }

  postMessage(msg: string): void {
    console.log(`Message sended to Topic: ${msg}`);
    this.message = msg;
    this.notifyObservers();
  }
}


class TopicSubscriber implements Observer {
  private readonly name: string;
  private topic: Subject;

  constructor(name: string, topic: Subject) {
    this.name = name;
    this.topic = topic;
  }

  update(): void {
    const msg = this.topic.getUpdate(this);
    console.log(`${this.name} :: got message >> ${msg}`);
  }
}

(() => {
  const topic = new Topic();
  const a = new TopicSubscriber("a", topic); // 이름과 Topic을 지정하여 Subcriber 생성
  const b = new TopicSubscriber("b", topic); // 이름과 Topic을 지정하여 Subcriber 생성
  const c = new TopicSubscriber("c", topic); // 이름과 Topic을 지정하여 Subcriber 생성

  topic.register(a); // Topic에 Subscriber 등록
  topic.register(b); // Topic에 Subscriber 등록
  topic.register(c); // Topic에 Subscriber 등록

  topic.postMessage("Hello post Message by topic"); // Topic에 등록된 Subscriber에게 메시지 Publish

  /**
   * Message sended to Topic: Hello post Message by topic
   * a :: got message >> Hello post Message by topic
   * b :: got message >> Hello post Message by topic
   * c :: got message >> Hello post Message by topic
   */
})();