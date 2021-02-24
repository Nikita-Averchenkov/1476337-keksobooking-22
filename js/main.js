const getRandomInteger = function (min, max) {
  const randomNumber = min + Math.random() * (max - min + 1);
  if (min < 0) {
    return new Error('Диапазон может быть больше или равен нулю')
  } else if (min >= max) {
    return new Error('Начальное значение диапазона не должно быть больше или равным конечному');
  } else {
    return Math.floor(randomNumber);
  }
}

alert(getRandomInteger(1, 50));


const getRandomFloatingPoint = function (min, max, decimalDigits) {
  if (min < 0) {
    return new Error('Диапазон может быть больше или равен нулю');
  } else if (decimalDigits < 0) {
    return new Error('Кол-во чисел после запятой может быть больше или равен нулю');
  } else if (min >= max) {
    return new Error('Начальное значение диапазона не должно быть больше или равным конечному');
  } else {
    return Number((Math.random() * (max - min) + min).toFixed(decimalDigits));
  }
}
alert(getRandomFloatingPoint(0, 9.9, 3));

