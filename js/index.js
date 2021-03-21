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

const closeBtn = document.querySelectorAll('.popup__close'); //поиск кнопок закрытия

//добаваляю карточки на страницу
function createCard(element){
  const newCard = cardTemlate.querySelector('.element').cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  const elementTitle = newCard.querySelector('.element__title');

  elementTitle.textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.name;

  showBiggestImage(elementImage);
  addLike(newCard);
  deleteCard(newCard);
  return newCard;
}

//рендер на страницу
function renderInitialCards () {
  const cards = initialCards.map(createCard);


  cardsContainer.prepend(...cards);
}
renderInitialCards();


//рендер на страницу новой карточки
function addCardFormSubmitHandler () {
  const card = createCard({name: inputCardAddName.value, link: inputCardAddImg.value});
  cardsContainer.prepend(card);
  closePopup(popupCard);
  inputCardAddImg.value ='';
  inputCardAddName.value ='';
}

//Эта функция добавляет модификатор открытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//открывает попап профиля
function openProfile() {
  nameInput.value = nameProf.textContent;
  jobInput.value = jobDiscr.textContent;
  openPopup(profileAdd);
}

//Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//редактирование профиля
function editProfileFormSubmitHandler () {
  nameProf.textContent = nameInput.value;
  jobDiscr.textContent = jobInput.value;
  closePopup(profileAdd);
}

//Лайки
function addLike (card) {
  const likeBtn = card.querySelector('.element__like');
  likeBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });
}

//Удаление карточек
function deleteCard (card) {
  const removeCard = card.querySelector('.element__delete');
  removeCard.addEventListener('click', (e) => {
    e.target.closest('.element').remove();
  });
}

//открытие попапа картинки
function showBiggestImage (elementImage) {
  elementImage.addEventListener('click', () => {
    popupImage.src = elementImage.src;
    popupFigcaption.textContent = elementImage.alt;
    popupImage.alt = elementImage.alt;
    openPopup(popupShowImage);
  });
}

// закрытие попапов с кнопки "закрыть"
function setClosePopupListeners () {
  closeBtn.forEach(function(btn) {
    btn.addEventListener('click', (e) =>
    closePopup(e.target.closest('.popup'), inputCardAddImg.value ='', inputCardAddName.value =''));

  });
}
setClosePopupListeners();

//Вызовы функций слушателями
openProfileButton.addEventListener('click', openProfile);// открытие попап профиля
formProfile.addEventListener('submit', editProfileFormSubmitHandler);//кнопка закрытия формы
addCardButton.addEventListener('click', () => openPopup(popupCard));// кнопка добавления карточки
formCard.addEventListener('submit', addCardFormSubmitHandler);
