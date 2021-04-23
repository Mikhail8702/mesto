import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImageVariable = this._popup.querySelector('.popup__image');
    this._popupFigcaptionVariable = this._popup.querySelector('.popup__figcaption');
  }

  open(cardText, cardImage){
    super.open();
    this._popupImageVariable.src = cardImage;
    this._popupImageVariable.alt = cardText;
    this._popupFigcaptionVariable.textContent = cardText;
  }

}
