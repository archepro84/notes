const closureIIFE = (() => {
  const a = 1;
  const b = () => 2;
  const public = {
    c: 2,
    d: () => 3,
  }

  return public;
})();

console.log(closureIIFE);
console.log(closureIIFE.a);
console.log(closureIIFE.b);
console.log(closureIIFE.c);
console.log(closureIIFE.d);
console.log(closureIIFE.d());

/**
 * { c: 2, d: [Function: d] }
 * undefined
 * undefined
 * 2
 * [Function: d]
 * 3
 */