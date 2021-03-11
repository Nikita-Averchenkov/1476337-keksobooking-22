import {
  createOffers
} from './data.js';

const typeProperty = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const similarListElement = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');



const createFeatures = (featuresList) => {
  const featuresContainer = document.createDocumentFragment();
  featuresList.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresContainer.appendChild(featureElement);
  });
  return featuresContainer;
}



const createPhotos = (photosList) => {
  const photosContainer = document.createDocumentFragment();
  photosList.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photosContainer.appendChild(photoElement);
  });
  return photosContainer;
}

const similarCards = createOffers();

const createCardsArray = () => {
  const cards = [];

  similarCards.forEach((card) => {
    const cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeProperty[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    const photos = createPhotos(card.offer.photos, cardElement.querySelector('.popup__photo'));
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(photos);

    const features = createFeatures(card.offer.features, cardElement.querySelector('.popup__feature'));
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(features);

    cards.push(cardElement);
  });

  return cards;
};

const cardsArray = createCardsArray();

const addCardIntoContainer = (arr) => {
  //const fragment = document.createDocumentFragment();
  similarListElement.appendChild(arr[0]);
};

addCardIntoContainer(cardsArray);
