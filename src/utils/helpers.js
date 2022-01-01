export const arrayToObject = (key, array) => {
  console.log(array);
  if (!Array.isArray(array)) {
    throw new TypeError('Object provided is not an array');
  }

  if (array.length === 0) {
    return {};
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

export const digitsIn = (number) => {
  return (Math.log(number) * Math.LOG10E + 1) | 0;
};

export const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const shortenedPriceWords = (price) => {
  let priceNum = parseInt(price, 10);
  if (digitsIn(priceNum) === 4 || digitsIn(priceNum) === 5) {
    return `${round(priceNum / 1000, 1)} K`;
  }
  if (digitsIn(priceNum) === 6 || digitsIn(priceNum) === 7) {
    return `${round(priceNum / 100000, 1)} L`;
  }
  if (digitsIn(priceNum) >= 8) {
    return `${round(priceNum / 10000000, 1)} Cr`;
  }
  return `${round(priceNum, 1)}`;
};

export const shortenedPrice = (prices) =>{
  if(prices.length === 1){
    return shortenedPriceWords(prices[0]);
  } else {
    let min = Math.min(...prices);
    let max = Math.max(...prices);
    return shortenedPriceWords(min) + '-' + shortenedPriceWords(max);
  }
}
