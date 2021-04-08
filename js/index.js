import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-cards.js';

const cardsContainer = document.querySelector('.elements');
const profileAdd = document.querySelector('#popup-add-profile');//поиск значения попап окна
const openProfileButton = document.querySelector('.profile__add');//кнопка редактирования профиля
const nameProf = document.querySelector('.profile__name');//поиск тайтла страницы
const jobDiscr = document.querySelector('.profile__discription');//поиск "професси"
const nameInput = document.querySelector('#popup-profile-input-id');//значение 1го инпута
const jobInput = document.querySelector('#popup-job-input-id');//значение 2го инпута
const formProfile = document.querySelector('#form-profile');//форма добавления профиля

// //форма добавление карточек
const popupCard = document.querySelector('#popup-add-card');//форма добавления карточки
const addCardButton = document.querySelector('.profile__add-btn'); //кнопка добавления карты места
const inputCardAddName = document.querySelector('#input-card-name-add'); //инпут попапа добавления карточки 1
const inputCardAddImg = document.querySelector('#input-card-img-link'); //инпут попапа добавления карточки 2
const savePopupCard = document.querySelector('#save-button-add-card');//кнопка "сохранить"
const formCard = document.querySelector('#form-card');

const popupList = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputError: '.popup__error'
};

const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formCard);

initialCards.forEach((item) => {
  createCard(item);
});


function createCard(item) {
  const card = new Card(item, '#element-card', openPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

//рендер на страницу новой карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  createCard({name: inputCardAddName.value, link: inputCardAddImg.value});
  closePopup(popupCard);
  setDisabledBtn(popupCard);
  formCard.reset();
}

//функция заносит класс деактивации кнопки "сохранить" в попапе
function setDisabledBtn() {
  savePopupCard.classList.add('popup__btn_disabled');
  savePopupCard.setAttribute('disabled', true);
}

//проверка кнопки Esc
const checkKeyCode = (evt) => {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopup);
  }
};

//Эта функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', checkKeyCode);
}

//открывает попап профиля
function openProfile() {
  nameInput.value = nameProf.textContent;
  jobInput.value = jobDiscr.textContent;
  editProfileFormValidator.enableValidation();
  editProfileFormValidator.deleteError();
  openPopup(profileAdd);
}

//открытие попапа создания карточки
function openCardPopup() {
  formCard.reset();
  addCardFormValidator.enableValidation();
  addCardFormValidator.deleteError();
  openPopup(popupCard);
}

//Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkKeyCode);
}

//функция закрытия по "крестику" и оверлэю
function hidePoup() {
  popupList.forEach(function(popup) {
    popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
    });
  });
}
hidePoup();

//редактирование профиля
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobDiscr.textContent = jobInput.value;
  closePopup(profileAdd);
}

//Вызовы функций слушателями
openProfileButton.addEventListener('click', openProfile);// открытие попап профиля
formProfile.addEventListener('submit', editProfileFormSubmitHandler);//кнопка закрытия формы
addCardButton.addEventListener('click', openCardPopup);// кнопка добавления карточки
formCard.addEventListener('submit', addCardFormSubmitHandler);
