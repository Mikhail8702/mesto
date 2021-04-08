export class FormValidator {
  constructor(validationConfig, forms) {
    this._validationConfig = validationConfig;
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
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formList.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners () {
    const inputList = Array.from(this._formList.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formList.querySelector(this._validationConfig.submitButtonSelector);
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
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  deleteError() {
    const inputList = this._formList.querySelectorAll(this._validationConfig.inputSelector);
    const inputError = this._formList.querySelectorAll(this._validationConfig.inputError);
    inputList.forEach((input) => {
      input.classList.remove(this._validationConfig.inputErrorClass);
    });
    inputError.forEach((error) => {
      error.classList.remove(this._validationConfig.errorClass);
    });
  }

  enableValidation () {
    this._setEventListeners();
  }
}
