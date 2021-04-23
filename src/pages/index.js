import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initial-cards.js';
import {cardsContainer, openProfileButton, nameInput, jobInput, formProfile, popupCard,
  addCardButton, formCard, elementTemplate, validationConfig, popupProfileSelector, popupCardSelector,
  popupImageSelector, nameSelector, subSelector} from '../utils/constants.js';

import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//создание экземляров класса валидаторов
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formCard);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//создание экземпляров класса попапов
const popupProfileAdd = new PopupWithForm(popupProfileSelector, editProfileFormSubmitHandler);
const popupCardAdd = new PopupWithForm(popupCardSelector, addCardFormSubmitHandler);
const popupImageAdd = new PopupWithImage(popupImageSelector);

//Экземпляр класса UserInfo
const userInfoClass = new UserInfo(nameSelector, subSelector);


export function handleOnClick(cardText, cardImage) {
  popupImageAdd.open(cardText, cardImage);
}

function createCard(item) {
  const card = new Card(item, elementTemplate, handleOnClick);
  return card.generateCard();
}

//экземпляр класса Section (рендер карточек на страницу)
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
},
cardsContainer
);
//рендер карточек на страницу
cardsList.rendererItem();

//рендер на страницу новой карточки
function addCardFormSubmitHandler (data) {
  const cardElement = createCard({name: data['input-card-add-name'], link: data['input-card-add-link']});
  cardsContainer.prepend(cardElement);
  popupCardAdd.close();
}

//открывает попап профиля
openProfileButton.addEventListener('click', () =>{
  const userInfoBox = userInfoClass.getUserInfo();
  nameInput.value = userInfoBox.userName;
  jobInput.value = userInfoBox.userInfo;
  editProfileFormValidator.deleteError();
  popupProfileAdd.open();
});

//открытие попапа создания карточки
addCardButton.addEventListener('click', () => {
  formCard.reset();
  addCardFormValidator.deleteError();
  popupCardAdd.open();
});

//редактирование профиля
function editProfileFormSubmitHandler (data) {
  userInfoClass.setUserInfo(data);
  popupProfileAdd.close();
}

//слушатель закрытия поапа на крестики овкрлей
popupProfileAdd.setEventListeners();
popupCardAdd.setEventListeners();
popupImageAdd.setEventListeners();
