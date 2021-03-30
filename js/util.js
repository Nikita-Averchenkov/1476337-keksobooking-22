const WARNING_SHOW_TIME = 5000;

const getOfferType = (types) => {
  switch (types) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Любой тип жилья';
  }
};

const isEscapeEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.code === 27;
};

const showWarning = (message) => {
  const warningContainer = document.createElement('div');
  warningContainer.style.zIndex = 100;
  warningContainer.style.position = 'absolute';
  warningContainer.style.left = 0;
  warningContainer.style.top = 0;
  warningContainer.style.right = 0;
  warningContainer.style.padding = '10px 3px';
  warningContainer.style.fontSize = '30px';
  warningContainer.style.textAlign = 'center';
  warningContainer.style.backgroundColor = 'red';
  warningContainer.textContent = message;
  document.body.append(warningContainer);

  setTimeout(() => {
    warningContainer.remove();
  }, WARNING_SHOW_TIME);
}
export {getOfferType, isEscapeEvent, showWarning};
