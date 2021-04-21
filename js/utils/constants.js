
export const cardsContainer = document.querySelector('.elements');
export const profileAdd = document.querySelector('#popup-add-profile');//поиск значения попап окна
export const openProfileButton = document.querySelector('.profile__add');//кнопка редактирования профиля
export const nameProf = document.querySelector('.profile__name');//поиск тайтла страницы
export const jobDiscr = document.querySelector('.profile__discription');//поиск "професси"
export const nameInput = document.querySelector('#popup-profile-input-id');//значение 1го инпута
export const jobInput = document.querySelector('#popup-job-input-id');//значение 2го инпута
export const formProfile = document.querySelector('#form-profile');//форма добавления профиля

// //форма добавление карточек
export const popupCard = document.querySelector('#popup-add-card');//форма добавления карточки
export const addCardButton = document.querySelector('.profile__add-btn'); //кнопка добавления карты места
export const inputCardAddName = document.querySelector('#input-card-name-add').value; //инпут попапа добавления карточки 1
export const inputCardAddImg = document.querySelector('#input-card-img-link').value; //инпут попапа добавления карточки 2
export const savePopupCard = document.querySelector('#save-button-add-card');//кнопка "сохранить"
export const formCard = document.querySelector('#form-card');//поиск формы попапа создания карточки
export const elementTemplate = '#element-card';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputError: '.popup__error'
};

export const popupImage = document.querySelector('#popup-show-image');
