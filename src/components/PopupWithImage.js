import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(card){
    super.open();
    const popupImageVariable = this._popup.querySelector('.popup__image');
    const popupFigcaptionVariable = this._popup.querySelector('.popup__figcaption');
    const elementImage = card.querySelector('.element__image');
    popupImageVariable.src = elementImage.src;
    popupImageVariable.alt = elementImage.alt;
    popupFigcaptionVariable.textContent = elementImage.alt;
  }

}
