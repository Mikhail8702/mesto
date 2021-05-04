import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, ) {
    super(popupSelector);
    this._button = this._popup.querySelector('#save-button-delete-card');
  }
  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;

  }
  setEventListeners () {
    super.setEventListeners();
    this._button.addEventListener('click', () =>{

      this._handleSubmitCallback();
    });
  }

  close() {
    super.close();

  }

}
