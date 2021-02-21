let profileAdd = document.querySelector('.popup');//поиск значения попап окна
let addButton = document.querySelector('.profile__add');//кнопка редактирования профиля
let closeButton = document.querySelector('.popup__close');//кнопка закрытия профиля
let nameProf = document.querySelector('.profile__name');//поиск тайтла страницы
let jobDiscr = document.querySelector('.profile__discription');//поиск "професси"
let nameInput = document.querySelector('#input__popup-name');//значение 1го инпута
let jobInput = document.querySelector('#input__popap-job');//значение 2го инпута
let popupForm = document.querySelector('.popup__form');//форма


//Открытие/Закрытие popup-окна
function openPopup() {
  profileAdd.classList.add('popup_opened');
  nameInput.value = nameProf.textContent;
  jobInput.value = jobDiscr.textContent;

}
addButton.addEventListener('click', openPopup);

function closePopup() {
  profileAdd.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobDiscr.textContent = jobInput.value;
  closePopup();
}
popupForm.addEventListener('submit', formSubmitHandler);
