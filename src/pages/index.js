import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {cardsContainer, openProfileButton, nameInput, jobInput, formProfile,
  addCardButton, formCard, elementTemplate, validationConfig, popupProfileSelector, popupCardSelector,
  popupImageSelector, nameSelector, subSelector, avatarSelector, popupWithSubmitSelector,
  profileAvatarBtn, formAva, popupEditAvaSelector} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import  UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


//создание экземляров класса валидаторов
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formCard);
const editAvaProfFormValid = new FormValidator(validationConfig, formAva);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvaProfFormValid.enableValidation();

//создание экземпляров класса попапов
const popupProfileAdd = new PopupWithForm(popupProfileSelector, editProfileFormSubmitHandler, renderLoading);
const popupCardAdd = new PopupWithForm(popupCardSelector, addCardFormSubmitHandler, renderLoading);
const popupAvaAdd = new PopupWithForm(popupEditAvaSelector, editAvatarProfileFormHandler, renderLoading);
const popupImageAdd = new PopupWithImage(popupImageSelector);
const popupWithSubmit = new PopupWithSubmit(popupWithSubmitSelector);

//Экземпляр класса UserInfo
const userInfoClass = new UserInfo(nameSelector, subSelector, avatarSelector);

//создание экземпляра класса API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: '42c7a0fd-dd67-46fe-a70d-a4b4d3829ca8',
    'Content-Type': 'application/json'
  }
});

//коллбек для открытия карточки с большим изображением
function handleOnClick(cardText, cardImage) {
  popupImageAdd.open(cardText, cardImage);
}

// колбек для работы с попапом подтверждения удаления карточки
function handleDeleteClick (id, card) {

  popupWithSubmit.setSubmitAction(() => {
    const deletedCard = api.deleteCard(id);
    deletedCard.then(res => {
      popupWithSubmit.close();
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });

  });
  popupWithSubmit.open();
}

//функция добавляет лайк
function addLikes(id, card) {
  const likes = api.addLike(id);
  likes.then(res => {
    card.updateLike(res.likes.length);
  })
  .catch((err) => {
    console.log(err);
  });
}

//функиця убирает лайк
function removeLike (id, card) {
  const likes = api.removeLike(id);
  likes.then(res => {
    card.updateLike(res.likes.length);
  })
  .catch((err) => {
    console.log(err);
  });
}

//создание карточки
function createCard(item, userId) {
  const card = new Card(item, userId, elementTemplate, handleOnClick, handleDeleteClick, addLikes, removeLike);
  return card.generateCard();
}

  //рендер на страницу новой карточки
  function addCardFormSubmitHandler (data, button, buttonText) {
    const cardElement = api.createNewCard(data);
    cardElement.then((data) => {
      const userIdCard = data.owner._id;
      const newCard = createCard(data, userIdCard);
      cardsList.addItem(newCard);
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button, buttonText);
    });

  }

//экземпляр класса Section рендеринг карточек
  const cardsList = new Section(
    (item, userId) => {
      const cardElement = createCard(item, userId);
      cardsList.addItem(cardElement);
    },
    cardsContainer
  );

//получение данных пользователя
  const apiProfile = api.getUserInfo();
  apiProfile.then((data) => {
    const userId = data._id;
    userInfoClass.setUserInfo(data);

    //рендер карточек
    const basicCards = api.getInitialCards();
    basicCards.then((data) =>{
    cardsList.renderItems(data, userId);
  })
  .catch((err) => {
    console.log(err);
  });

  })
  .catch((err) => {
    console.log(err);
  });



//открывает попап профиля
openProfileButton.addEventListener('click', () => {
  const userInfoBox = userInfoClass.getUserInfo();
  nameInput.value = userInfoBox.userName;
  jobInput.value = userInfoBox.userInfo;
  editProfileFormValidator.deleteError();
  popupProfileAdd.open();
});

//открытие попапа создания карточки
addCardButton.addEventListener('click', () => {
  addCardFormValidator.deleteError();
  addCardFormValidator.disableSubmitButton();
  popupCardAdd.open();
});

//открывает попап смены аватара
profileAvatarBtn.addEventListener('click', () =>{
  popupAvaAdd.open();
  editAvaProfFormValid.disableSubmitButton();
});

//редактирование профиля
function editProfileFormSubmitHandler (data, button, buttonText) {
  const userData = api.editProfileData(data);
  userData.then((data) => {
    userInfoClass.setUserInfo(data);
    popupProfileAdd.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, button, buttonText);
  });

}

//добавление аватара
function editAvatarProfileFormHandler(data, button, buttonText) {
  const avaData = api.editProfileAva(data);
  avaData.then((data) => {
    userInfoClass.setUserInfo(data);
    popupAvaAdd.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, button, buttonText);
  });
}

//функция меняет текст кнопки во время загрузки
function renderLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  }
   else {
    button.textContent = buttonText;
  }
}

//слушатель закрытия поапа на крестики овкрлей
popupProfileAdd.setEventListeners();
popupCardAdd.setEventListeners();
popupImageAdd.setEventListeners();
popupWithSubmit.setEventListeners();
popupAvaAdd.setEventListeners();
