import {isEscapeEvent} from './util.js';

const successModuleTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModuleTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModuleOpenBtn = errorModuleTemplate.querySelector('.error__button');

const errorModule = () => {
  document.querySelector('main').appendChild(errorModuleTemplate);
  const onPopupKeydown = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      closeErrorModule();
    }
  };
  document.addEventListener('keydown', onPopupKeydown);
  document.body.addEventListener('click', () => {
    closeErrorModule();
  });

  const closeErrorModule = () => {
    errorModuleTemplate.remove();
    document.removeEventListener('keydown', onPopupKeydown);
  };
  errorModuleOpenBtn.addEventListener('click', () => {
    closeErrorModule();
  });
};

const successModule = () => {
  document.querySelector('main').appendChild(successModuleTemplate);
  const onPopupKeydown = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      closeSuccessModule();
    }
  };
  document.addEventListener('keydown', onPopupKeydown);
  document.body.addEventListener('click', () => {
    closeSuccessModule();
  });
  const closeSuccessModule = () => {
    successModuleTemplate.remove();
    document.removeEventListener('keydown', onPopupKeydown);
  };
}

export {successModule, errorModule};
