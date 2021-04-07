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
    this._setEventListenersLikeBtn();
    this._setEventListenersDeleteBtn();
    this._setEventListenersShowImage();


    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

  _setEventListenersLikeBtn() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeActive();
    });
  }

  _setEventListenersDeleteBtn() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteBtn();
    });
  }

  _setEventListenersShowImage() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImagePopup();
    });
  }
  _handleLikeActive() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteBtn() {
    this._element.querySelector('.element__delete').closest('.element').remove();
  }
  _handleImagePopup() {
    const imagePopup = document.querySelector('#popup-show-image');
    document.querySelector('.popup__image').src = this._image;
    document.querySelector('.popup__figcaption').textContent = this._text;
    this._openPopup(imagePopup);
  }
}
