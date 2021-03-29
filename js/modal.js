import { isEscEvent } from './util.js';

const succesModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModalOpenBtn = errorModalTemplate.querySelector('.error__button');

const errorModal = () => {
  document.querySelector('main').appendChild(errorModalTemplate);
  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeErrorModal();
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', () => {
    closeErrorModal();
  });

  const closeErrorModal = () => {
    errorModalTemplate.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
  errorModalOpenBtn.addEventListener('click', () => {
    closeErrorModal();
  });
};

const successModal = () => {
  document.querySelector('main').appendChild(succesModalTemplate);
  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeSuccessModal();
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.addEventListener('click', () => {
    closeSuccessModal();
  });
  const closeSuccessModal = () => {
    succesModalTemplate.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
}

export { successModal, errorModal };
