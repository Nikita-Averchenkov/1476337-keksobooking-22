import {showWarning} from './util.js';

const obtainData = (onLuck) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((declarations) => {
      onLuck(declarations);
    })
    .catch(() => {
      showWarning('Не удалось получить данные. Попробуйте обновить страницу');
    });
};

const transferData = (onLuck, onFailure, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onLuck();
    } else {
      onFailure();
    }
  })
    .catch(() => {
      onFailure();
    });
};

export {obtainData, transferData};
