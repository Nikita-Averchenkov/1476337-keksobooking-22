import {successModule, errorModule} from './modal.js';
import {transferData} from './api.js';
import {updateMarkersMap} from './main.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const HOUSING_IMG_WIDTH = 70;
const HOUSING_IMG_HEIGHT = 70;
const DEFAULT_AVATAR_IMG_SRC = 'img/muffin-grey.svg';
const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ADDRESS_DEFAULT_COORDINATES = '35.6895000, 139.6917100';
const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormElement = mapForm.querySelectorAll('.map__filter');
const mapFormCheckbox = mapForm.querySelectorAll('.map__checkbox');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeDefault = document.querySelector('#type').value;
const priceDefault = document.querySelector('#price').placeholder;
const timeInDefault = document.querySelector('#timein').value;
const timeOutDefault = document.querySelector('#timeout').value;
const roomDefault = document.querySelector('#room_number').value;
const capacityDefault = document.querySelector('#capacity').value;
const featureCheckbox = document.querySelectorAll('.feature__checkbox');
const descriptionDefault = document.querySelector('#description').value;
const avatarUser = document.querySelector('.ad-form__field input[type=file]');
const avatarUserPreview = document.querySelector('.ad-form-header__preview img');
const housingImg = document.querySelector('.ad-form__upload input[type=file]');
const housingImgPreviewList = document.querySelector('.ad-form__photo-list');
const housingImgPreviewItem = document.querySelector('.ad-form__photo');
const btnReset = document.querySelector('.ad-form__reset');

const housingTypeDefault = document.querySelector('#housing-type').value;
const housingPriceDefault = document.querySelector('#housing-price').value;
const housingRoomsDefault = document.querySelector('#housing-rooms').value;
const housingGuestsDefault = document.querySelector('#housing-guests').value;
const mapFeatureCheckbox = document.querySelectorAll('.map__checkbox');

const CAPACITY_SETTINGS = {
  1: [2, 2],
  2: [1, 2],
  3: [0, 2],
  100: [3, 3],
}

//  Неактивное / Активное
const addElementDisabling = (formElements) => {
  formElements.forEach(element => {
    element.setAttribute('disabled', 'true');
  });
};
const deleteElementDisabling = (formElements) => {
  formElements.forEach(element => {
    element.removeAttribute('disabled');
  });
};

const unplugPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('ad-form--disabled');
  addElementDisabling(adFormElement);
  addElementDisabling(mapFormElement);
  addElementDisabling(mapFormCheckbox);
};

const includePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
  deleteElementDisabling(adFormElement);
  deleteElementDisabling(mapFormElement);
  deleteElementDisabling(mapFormCheckbox);
};


// Валидация
const typeSelect = document.querySelector('#type');
const getPriceMinimumValue = (typeSelectValue) => {
  switch (typeSelectValue) {
    case 'flat':
      return 1000;
    case 'bungalow':
      return 0;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    default:
      return 0;
  }
};

typeSelect.addEventListener('change', () => {
  const priceMinimum = getPriceMinimumValue(typeSelect.value);
  document.querySelector('#price').placeholder = priceMinimum;
  document.querySelector('#price').min = priceMinimum;
});

let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', (event) => {
  timeOut.value = event.target.value
});

timeOut.addEventListener('change', (event) => {
  timeIn.value = event.target.value
});

let numberRooms = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

const disablingCapacities = () => {
  for (let i = 0; i < capacity.length; i++) {
    capacity[i].setAttribute('disabled', 'true');
  }
}
const enableCapacities = (start, end) => {
  for (let i = start; i < end + 1; i++) {
    capacity[i].removeAttribute('disabled');
  }
}

if (+numberRooms.value === 1) {
  disablingCapacities();
  capacity[2].selected = true;
  capacity[2].removeAttribute('disabled');
}

numberRooms.addEventListener('change', () => {
  for (let i = 0; i < numberRooms.length; i++) {
    if (numberRooms.value === capacity[i].value) {
      capacity[i].selected = true;
    }
  }
  const numberRoomValue = +numberRooms.value;
  const settings = CAPACITY_SETTINGS[numberRoomValue];
  if (settings) {
    disablingCapacities();
    enableCapacities(...settings);
    if (numberRoomValue === 100) {
      capacity[3].selected = true;
    }
  }
});

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  priceInput.reportValidity();
});

// Добавление фотографий
const addFile = () => {
  avatarUser.addEventListener('change', () => {
    const file = avatarUser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarUserPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  housingImg.addEventListener('change', () => {
    housingImgPreviewItem.remove();
    const file = housingImg.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const housingImgPreview = new Image(HOUSING_IMG_WIDTH, HOUSING_IMG_HEIGHT);
        housingImgPreview.src = reader.result;
        housingImgPreview.classList.add('ad-form__photo')
        housingImgPreviewList.append(housingImgPreview);
      });

      reader.readAsDataURL(file);
    }
  });
}

const deleteImg = () => {
  avatarUserPreview.src = DEFAULT_AVATAR_IMG_SRC;
  const housingImg = document.querySelectorAll('.ad-form__photo-list img');
  housingImg.forEach(element => element.remove());
  housingImgPreviewList.append(housingImgPreviewItem);
}

// Отправление формы
const onFormLuck = () => {
  deleteImg();
  document.querySelector('#title').value = '';
  document.querySelector('#address').value = ADDRESS_DEFAULT_COORDINATES;
  document.querySelector('#type').value = typeDefault;
  document.querySelector('#price').placeholder = priceDefault;
  document.querySelector('#price').min = priceDefault;
  document.querySelector('#price').value = '';
  document.querySelector('#timein').value = timeInDefault;
  document.querySelector('#timeout').value = timeOutDefault;
  document.querySelector('#room_number').value = roomDefault;
  document.querySelector('#capacity').value = capacityDefault;
  featureCheckbox.forEach(element => {
    element.checked = false;
  });
  document.querySelector('#description').value = descriptionDefault;
  document.querySelector('#housing-type').value = housingTypeDefault;
  document.querySelector('#housing-price').value = housingPriceDefault;
  document.querySelector('#housing-rooms').value = housingRoomsDefault;
  document.querySelector('#housing-guests').value = housingGuestsDefault;
  mapFeatureCheckbox.forEach(element => {
    element.checked = false;
  });

  updateMarkersMap()
  successModule();
};

btnReset.addEventListener('click', () => {
  deleteImg()
})

const onFailure = () => {
  errorModule();
};

const setFormSubmit = (onLuck) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    transferData(
      onLuck,
      onFailure,
      new FormData(evt.target),
    );
  });
};

export {unplugPage, includePage, setFormSubmit, onFormLuck, addFile};
