import {getOfferType} from './util.js';

const PHOTO_IMG_WIDTH = 45;
const PHOTO_IMG_HEIGHT = 40;
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const provideCardElement = (author, offer) => {
  const cardElement = cardTemplate.cloneNode(true);

  const offerType = getOfferType(offer.type);
  cardElement.querySelector('.popup__type').textContent = offerType;
  // наполняем данными
  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }
  if (offer.title) {
    cardElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('visually-hidden');
  }
  if (offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('visually-hidden');
  }
  if (offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  }
  if (offer.rooms || offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }
  if (offer.checkin || offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  }
  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('visually-hidden');
  }
  if ((offer.features).length > 0) {
    cardElement.querySelector('.popup__features').textContent = ' ';
    const featuresList = cardElement.querySelector('.popup__features');
    offer.features.forEach((element) => {
      const featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature');
      const featuresClass = `popup__feature--${element}`;
      featuresItem.classList.add(featuresClass);
      featuresList.append(featuresItem);
    });
  } else {
    cardElement.querySelector('.popup__features').classList.add('visually-hidden');
  }
  if ((offer.photos).length > 0) {
    cardElement.querySelector('.popup__photos').textContent = ' ';
    const photoList = cardElement.querySelector('.popup__photos');
    offer.photos.forEach((photo) => {
      const photoImg = new Image(PHOTO_IMG_WIDTH, PHOTO_IMG_HEIGHT);
      photoImg.classList.add('popup__photo');
      photoImg.src = photo;
      photoList.append(photoImg);
    });

  } else {
    cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
  }
  return cardElement;
};

export {provideCardElement};
