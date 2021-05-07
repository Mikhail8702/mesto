import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandlerCallback, renderLoading) {
    super(popupSelector);
    this._submitHandler = submitHandlerCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__btn');
    this._buttonText = this._popup.querySelector('.popup__btn').textContent;
    this._renderLoading = renderLoading;
  }

  _getInputValues() {
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._renderLoading(true, this._button);
      this._submitHandler(this._getInputValues(), this._button, this._buttonText);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

