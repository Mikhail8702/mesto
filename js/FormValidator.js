export class FormValidator {
  constructor(formObject, forms) {
    this._formObject = formObject;
    this._formList = forms;
  }

  _validationForms (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formList.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formObject.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formList.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formObject.inputErrorClass);
    errorElement.classList.remove(this._formObject.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners () {
    const inputList = Array.from(this._formList.querySelectorAll(this._formObject.inputSelector));
    const buttonElement = this._formList.querySelector(this._formObject.submitButtonSelector);
    this._setButtonValue(inputList, buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    this._validationForms(inputElement);
    this._setButtonValue(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setButtonValue (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formObject.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._formObject.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation () {
    this._setEventListeners();
  }
}
