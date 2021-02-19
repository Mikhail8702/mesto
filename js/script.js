let profileAdd = document.querySelector('.popup');//поиск значения попап окна
let addButton = document.querySelector('.profile__add');//кнопка редактирования профиля
let closeButton = document.querySelector('.popup__close');//кнопка закрытия профиля
let nameProf = document.querySelector('.profile__name');//поиск тайтла страницы
let jobDiscr = document.querySelector('.profile__discription');//поиск "професси"
let nameInput = document.querySelector('#first__input');//значение 1го инпута
let jobInput = document.querySelector('#second__input');//значение 2го инпута
let savePopup = document.querySelector('.popup__btn');//значение кнопик "сохранить"

//Открытие/Закрытие popup-окна
addButton.addEventListener('click', function() {
  profileAdd.classList.add('popup_opened');
  });

closeButton.addEventListener('click', function() {
  profileAdd.classList.remove('popup_opened');
});

//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobDiscr.textContent = jobInput.value;
  profileAdd.classList.remove('popup_opened');
}
savePopup.addEventListener('click', formSubmitHandler);
