const formObject = {
  formSelector: ('.popup__form'),
  inputSelector: ('.popup__input'),
  submitButtonSelector: ('.popup__btn'),
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// Функция isValid теперь принимает formElement и inputElement,

const isValid = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};


const hideInputError = (formElement, inputElement, inputErrorClass) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);


  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

const setEventListeners = (formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass) => {

  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
     isValid(formElement, inputElement, inputErrorClass);
     toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


const enableValidation = ({formSelector, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {

    evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,

    setEventListeners(formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass);
  });
};

// Вызовем функцию
enableValidation(formObject);
