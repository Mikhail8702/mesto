export  class FormValidator {
  constructor(validationConfig, forms) {
    this._validationConfig = validationConfig;
    this._formList = forms;
    this._inputList = Array.from(this._formList.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formList.querySelector(this._validationConfig.submitButtonSelector);
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
    this._setButtonValue(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validationForms(inputElement);
        this._setButtonValue(this._inputList, this._buttonElement);
      });
    });
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setButtonValue () {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  deleteError() {
    this._inputList.forEach(input => this._hideInputError(input));
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  enableValidation () {
    this._setEventListeners();
  }
}
