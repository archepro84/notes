const mapObject = new Map();
const setObject = new Set();


mapObject.set('a', 1);
mapObject.set('b', 2);
mapObject.set('c', 3);

setObject.add(1);
setObject.add(2);
setObject.add(3);


for (const mapItem of mapObject) console.log(mapItem);
for (const setItem of setObject) console.log(setItem);

/**
 * [ 'a', 1 ]
 * [ 'b', 2 ]
 * [ 'c', 3 ]
 * 1
 * 2
 * 3
 */