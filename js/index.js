const profileAdd = document.querySelector('#popup-add-profile');//поиск значения попап окна
const openProfileButton = document.querySelector('.profile__add');//кнопка редактирования профиля
const closeButton = document.querySelector('.popup__close');//кнопка закрытия профиля
const nameProf = document.querySelector('.profile__name');//поиск тайтла страницы
const jobDiscr = document.querySelector('.profile__discription');//поиск "професси"
const nameInput = document.querySelector('#popup-profile-input-id');//значение 1го инпута
const jobInput = document.querySelector('#popup-job-input-id');//значение 2го инпута
const formProfile = document.querySelector('#form-profile');//форма добавления профиля
const saveProfileButton = document.querySelector('#save-button-profile');//кнопка сохранения профиля

//форма добавление карточек
const popupCard = document.querySelector('#popup-add-card');//форма добавления карточки
const addCardButton = document.querySelector('.profile__add-btn'); //кнопка добавления карты места
const inputCardAddName = document.querySelector('#input-card-name-add'); //инпут попапа добавления карточки 1
const inputCardAddImg = document.querySelector('#input-card-img-link'); //инпут попапа добавления карточки 2
const savePopupCard = document.querySelector('#save-button-add-card');//кнопка "сохранить"
const formCard = document.querySelector('#form-card');

//temlate
const cardTemlate = document.querySelector('#element-card').content;//получение заготовки карточки
const cardsContainer = document.querySelector('.elements');//контейнер с карточками

//попап картинки
const popupShowImage =document.querySelector('#popup-show-image');//попап с картинками
const popupImage = document.querySelector('.popup__image');//изображение в попапе
const popupFigcaption = document.querySelector('.popup__figcaption');//подпись изображения в попапе

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

 //добаваляю карточки на страницу
function addCard(element){
const newCard = cardTemlate.querySelector('.element').cloneNode(true);

newCard.querySelector('.element__title').textContent = element.name;
newCard.querySelector('.element__image').src = element.link;
newCard.querySelector('.element__image').alt = element.name;

deleteCard(newCard);
addLike(newCard);
return newCard;
}

//рендер на страницу
function addCardToDOM () {
  const cardDOM = initialCards.map(addCard);

  cardsContainer.prepend(...cardDOM);
}

//Эта функция добавляет модификатор открытия попапов
function openPopup (e) {
  e.classList.add('popup_opened');
}

//открывает попап профиля
function openProfile() {
  nameInput.value = nameProf.textContent;
  jobInput.value = jobDiscr.textContent;
  openPopup(profileAdd);
}

//Функция закрытия попап
function closePopup(e) {
  e.classList.remove('popup_opened');
}

//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobDiscr.textContent = jobInput.value;
  closePopup(profileAdd);
}

//добавление новой карточки через попап
function addNewCard () {
  const newCardDOM = cardTemlate.querySelector('.element').cloneNode(true);

  newCardDOM.querySelector('.element__title').textContent = inputCardAddName.value;
  newCardDOM.querySelector('.element__image').src = inputCardAddImg.value;
  newCardDOM.querySelector('.element__image').alt = inputCardAddName.value;

  deleteCard(newCardDOM);
  addLike(newCardDOM);
  return newCardDOM;
}

//рендер на страницу новой карточки
function addNewCardToDOM (evt) {
  evt.preventDefault();
  const renderCard = addNewCard();
  cardsContainer.prepend(renderCard);
  closePopup(popupCard);
}
addCardToDOM();

//Лайки
function addLike (e) {
  const likeBtn = document.querySelector('.element__like');
  e.addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });
}

//Удаление карточек
function deleteCard (e) {
  const removeCard = document.querySelectorAll('.element__delete');
   e.addEventListener('click', (e) => {
    e.target.closest('.element').remove();
  });
}

//открытие попапа картинки
function showBiggestImage () {
  const allImage = document.querySelectorAll('.element__image');
  allImage.forEach(function(e) {
    e.addEventListener('click', () => {
      popupImage.src = e.src;
      popupFigcaption.textContent = e.alt;
      popupImage.alt = e.alt;
      openPopup(popupShowImage);
    });
  });
}

//закрытие попапов с кнопки "закрыть"
function closePopupBtn () {
  const closeBtn = document.querySelectorAll('.popup__close');

  closeBtn.forEach(function(e) {
    e.addEventListener('click', () => {
      e.closest('.popup').classList.toggle('popup_opened');
    });
  });
}

//Вызовы функций слушателями
openProfileButton.addEventListener('click', openProfile);// открытие попап профиля
formProfile.addEventListener('submit', formSubmitHandler);//кнопка закрытия формы
addCardButton.addEventListener('click', () => openPopup(popupCard));// кнопка добавления карточки
formCard.addEventListener('submit', addNewCardToDOM);

//вызовы функций
showBiggestImage();
closePopupBtn();
