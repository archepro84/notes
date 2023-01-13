function createReactiveObject(target, callback) {
  const proxyHandler = {
    /**
     * @param {Object} obj - the target object
     * @param {String} prop - the property Key
     * @param value - the property value
     * @returns {Boolean} - true if the property was successfully set
     * **/
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        callback(`${prop}가 ${prev}에서 ${value}로 변경되었습니다.`);
      }
      return true;
    }
  }

  const proxy = new Proxy(target, proxyHandler);
  return proxy;
}

const a = {
  "YoungWoo": "Solo"
}

const b = createReactiveObject(a, console.log);
b.YoungWoo = "Solo";
b.YoungWoo = "Couple";

/**
 * { YoungWoo: 'Solo' } YoungWoo Solo
 * { YoungWoo: 'Solo' } YoungWoo Couple
 * YoungWoo가 Solo에서 Couple로 변경되었습니다.
 * **/