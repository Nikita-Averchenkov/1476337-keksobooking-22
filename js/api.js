import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((declarations) => {
      onSuccess(declarations);
    })
    .catch(() => {
      showAlert('Не удалось получить данные. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
