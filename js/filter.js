const FILTER_DEFAULT_VALUE = 'any';
const OFFER_PRICE_MIN = 10000;
const OFFER_PRICE_MAX = 50000;
const MAX_PINS = 10;
const mapFilterFormat = document.querySelector('.map__filters');
const housingType = mapFilterFormat.querySelector('#housing-type');
const housingPrice = mapFilterFormat.querySelector('#housing-price');
const housingRooms = mapFilterFormat.querySelector('#housing-rooms');
const housingGuests = mapFilterFormat.querySelector('#housing-guests');

const filterOnType = (ad) => {
  return housingType.value === FILTER_DEFAULT_VALUE || ad.offer.type === housingType.value
}

const filterOnPrice = (ad) => {
  switch (housingPrice.value) {
    case 'middle':
      return (ad.offer.price >= OFFER_PRICE_MIN) && (ad.offer.price <= OFFER_PRICE_MAX);
    case 'low':
      return ad.offer.price < OFFER_PRICE_MIN;
    case 'high':
      return ad.offer.price > OFFER_PRICE_MAX;
    default:
      return true;
  }
}

const filterOnRooms = (ad) => {
  return housingRooms.value === FILTER_DEFAULT_VALUE || ad.offer.rooms === +housingRooms.value
}

const filterOnGuests = (ad) => {
  return housingGuests.value === FILTER_DEFAULT_VALUE || ad.offer.guests === +housingGuests.value
}

const filterFeatures = (ad) => {
  let featuresElements = [];
  const checkedFeatures = mapFilterFormat.querySelectorAll('#housing-features input:checked');
  checkedFeatures.forEach(element => featuresElements.push(element.value))
  return featuresElements.every((item) => ad.offer.features.includes(item));
}

const getFilters = (ad) => {
  return filterOnType(ad) &&
    filterOnPrice(ad) &&
    filterOnRooms(ad) &&
    filterOnGuests(ad) &&
    filterFeatures(ad)
}

const filterDeclarations = (data) => {
  const filteredPins = [];
  for (let ad of data) {
    if (getFilters(ad)) {
      filteredPins.push(ad);
    }
    if (filteredPins.length >= MAX_PINS) {
      return filteredPins;
    }
  }
  return filteredPins;
}

const setFilterChanger = (cb) => {
  mapFilterFormat.addEventListener('change', () => {
    cb();
  })
}

export {filterDeclarations, setFilterChanger}
