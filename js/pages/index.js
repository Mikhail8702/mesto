import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initial-cards.js';
import {cardsContainer, profileAdd, openProfileButton, nameProf, jobDiscr, nameInput,
  jobInput, formProfile, popupCard, addCardButton, savePopupCard, formCard, elementTemplate, validationConfig,
  popupImage} from '../utils/constants.js';

import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//создание экземляров класса валидаторов
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formCard);

//создание экземпляров класса попапов
const popupProfileAdd = new PopupWithForm(profileAdd, editProfileFormSubmitHandler);
const popupCardAdd = new PopupWithForm(popupCard, addCardFormSubmitHandler);
const popupImageAdd = new PopupWithImage(popupImage);

//Экземпляр класса UserInfo
const userInfoClass = new UserInfo({nameProf, jobDiscr});

//экземпляр класса Section (рендер карточек на страницу)
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, elementTemplate, handleOnClick);
    const cardElement = newCard.generateCard();
    cardsList.addItem(cardElement);
  },
},
cardsContainer
);
//рендер карточек на страницу
cardsList.rendererItem();


function handleOnClick(card) {
  popupImageAdd.open(card);
  popupImageAdd.setEventListeners();
}


//функция заносит класс деактивации кнопки "сохранить" в попапе
function setDisabledBtn() {
  savePopupCard.classList.add('popup__btn_disabled');
  savePopupCard.setAttribute('disabled', true);
}



//открывает попап профиля
openProfileButton.addEventListener('click', () =>{
  const userInfoBox = userInfoClass.getUserInfo();
  nameInput.value = userInfoBox.userName;
  jobInput.value = userInfoBox.userInfo;
  editProfileFormValidator.enableValidation();
  editProfileFormValidator.deleteError();
  popupProfileAdd.open();
  popupProfileAdd.setEventListeners();
});


//открытие попапа создания карточки
addCardButton.addEventListener('click', () => {
  formCard.reset();
  addCardFormValidator.enableValidation();
  addCardFormValidator.deleteError();
  popupCardAdd.open();
  popupCardAdd.setEventListeners();
});


//редактирование профиля
function editProfileFormSubmitHandler (data) {
  userInfoClass.setUserInfo(data);
  popupProfileAdd.close();
}


//рендер на страницу новой карточки
function addCardFormSubmitHandler (data) {
  const newCard = new Card({name: data['input-card-add-name'], link: data['input-card-add-link']}, elementTemplate, handleOnClick);
  const cardElement = newCard.generateCard();
  cardsList.addItem(cardElement);
  popupCardAdd.close();
  setDisabledBtn(popupCard);
}
