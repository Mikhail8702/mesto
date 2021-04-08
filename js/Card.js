const imagePopup = document.querySelector('#popup-show-image');
const popupImageVariable = document.querySelector('.popup__image');
const popupFigcaptionVariable = document.querySelector('.popup__figcaption');

export class Card {

  constructor (data, template, openPopup) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
    this._openPopup = openPopup;

  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');

    this._elementLike.addEventListener('click', () => {
      this._elementLike.classList.toggle('element__like_active');
    });

    this._elementDelete.addEventListener('click', () => {
      this._elementDelete.closest('.element').remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      popupImageVariable.src = this._image;
      popupImageVariable.alt = this._text;
      popupFigcaptionVariable.textContent = this._text;

     this._openPopup(imagePopup);
    });
  }

}
