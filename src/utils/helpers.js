export const arrayToObject = (key, array) => {
  if (!Array.isArray(array)) {
    throw new TypeError('Object provided is not an array');
  }

  if (!array.every((arrayObj) => arrayObj.hasOwnProperty(key))) {
    throw new TypeError(`Some objects in the array do not have key ${key}`);
  }

  let reducer = (previous, current) => {
    let obj = { ...current };
    delete obj[key];

    previous[current[key]] = obj;

    return previous;
  };

  return array.reduce(reducer, {});
};
