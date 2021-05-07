
export const cardsContainer = document.querySelector('.elements');
export const openProfileButton = document.querySelector('.profile__add');//кнопка редактирования профиля
export const nameInput = document.querySelector('#popup-profile-input-id');//значение 1го инпута
export const jobInput = document.querySelector('#popup-job-input-id');//значение 2го инпута
export const formProfile = document.querySelector('#form-profile');//форма добавления профиля
// export const profileName = document.querySelector('.profile__name'); //имя пользователя в разметке
// export const userInfo = document.querySelector('.profile__discription'); //опсиние профиля
export const profileAvatarBtn = document.querySelector('.profile__avatar-overlay');//кнопка добавления аватара
export const formAva = document.querySelector('#form-avatar');//форма аватара

// //форма добавление карточек
export const addCardButton = document.querySelector('.profile__add-btn'); //кнопка добавления карты места
export const savePopupCard = document.querySelector('#save-button-add-card');//кнопка "сохранить"
export const formCard = document.querySelector('#form-card');//поиск формы попапа создания карточки
export const elementTemplate = '#element-card';

//селекторы попапов
export const popupProfileSelector = '#popup-add-profile';
export const popupCardSelector = '#popup-add-card';
export const popupImageSelector = '#popup-show-image';
export const popupWithSubmitSelector = '#popup-delete-card';
export const popupEditAvaSelector = '#popup-add-profile-avatar';

//селекторы для userInfo
export const nameSelector = '.profile__name';
export const subSelector = '.profile__discription';
export const avatarSelector = '.profile__avatar';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputError: '.popup__error'
};

