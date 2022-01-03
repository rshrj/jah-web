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

export const isNumeric = (str) => {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

export const digitsIn = (number) => {
  return (Math.log(number) * Math.LOG10E + 1) | 0;
};

export const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const shortenedPriceWords = (price, decimalDigits = 1, end = true) => {
  let priceNum = parseInt(price, 10);
  if (digitsIn(priceNum) === 4 || digitsIn(priceNum) === 5) {
    let priceWords = `${round(priceNum / 1000, decimalDigits)}${
      end ? ' K' : ''
    }`;
    return end ? priceWords : { price: priceWords, end: 'K' };
  }
  if (digitsIn(priceNum) === 6 || digitsIn(priceNum) === 7) {
    let priceWords = `${round(priceNum / 100000, decimalDigits)}${
      end ? ' L' : ''
    }`;
    return end ? priceWords : { price: priceWords, end: 'L' };
  }
  if (digitsIn(priceNum) >= 8) {
    let priceWords = `${round(priceNum / 10000000, decimalDigits)}${
      end ? ' Cr' : ''
    }`;
    return end ? priceWords : { price: priceWords, end: 'Cr' };
  }
  let priceWords = `${round(priceNum, decimalDigits)}`;
  return end ? priceWords : { price: priceWords, end: '' };
};

export const shortenedPrice = (prices) => {
  if (prices.length === 1) {
    return shortenedPriceWords(prices[0]);
  } else {
    let min = Math.min(...prices);
    let max = Math.max(...prices);
    let typeMatch =
      shortenedPriceWords(min, 0, false).end ===
      shortenedPriceWords(max, 0, false).end;
    return typeMatch
      ? shortenedPriceWords(min, 0, false).price +
          '-' +
          shortenedPriceWords(max, 0, true)
      : shortenedPriceWords(min, 0, true) +
          '-' +
          shortenedPriceWords(max, 0, true);
  }
};
