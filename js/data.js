import {
  getRandomInteger,
  getRandomFloatingPoint,
  getRandomElement,
  getArrRandomLength
} from './util.js';

const types = ['palace', 'flat', 'house', 'bungalow']
const checks = ['12:00', '13:00', '14:00']
const titles = ['двухместный номер', 'трёхместный номер', 'номер кинг сайз']
const rooms = [25, 30, 45]
const guests = [2, 1]
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = 'Помещение большое. В нем трое окон и справа от дверей стоят книжные шкафы.';
const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


const createOffers = () => {
  const offers = []
  for (let i = 0; i < 10; i++) {
    const x = getRandomFloatingPoint(35.65000, 35.70000, 5)
    const y = getRandomFloatingPoint(139.70000, 139.80000, 5)
    const offer = {
      author: {
        avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
      },
      offer: {
        title: getRandomElement(titles),
        address: x + ', ' + y,
        price: getRandomInteger(10, 100),
        type: getRandomElement(types),
        rooms: getRandomElement(rooms),
        guests: getRandomElement(guests),
        checkin: getRandomElement(checks),
        checkout: getRandomElement(checks),
        features: getArrRandomLength(features),
        description: description,
        photos: getArrRandomLength(photos),
      },
      location: {
        x,
        y,
      },

    }

    offers[i] = offer


  }

  return offers;

}

const offers = createOffers();
console.log(offers);


export {
  offers
};
