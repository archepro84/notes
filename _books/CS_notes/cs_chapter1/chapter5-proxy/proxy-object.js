const handler = {
  get: (target, key) => {
    return key === "name" ? `${target.a} ${target.b}` : target[key]
  }
}

const p = new Proxy({ a: "Archepro84", b: "Is Developer" }, handler);
console.log(p.name); // Archepro84 Is Developer
console.log(p["name"]); // Archepro84 Is Developer
