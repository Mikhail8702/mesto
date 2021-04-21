import {savePopupCard} from './constants.js';


//функция заносит класс деактивации кнопки "сохранить" в попапе
export function setDisabledBtn() {
  savePopupCard.classList.add('popup__btn_disabled');
  savePopupCard.setAttribute('disabled', true);
}
