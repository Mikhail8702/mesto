
export class Card {
  constructor (item, elementTemplate, handleCardClick) {
    this._text = item.name;
    this._image = item.link;
    this._template = elementTemplate;
    this._handleOnClick = handleCardClick;

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
    this._elementImage = this._element.querySelector('.element__image');

    this._elementLike.addEventListener('click', () => {
      this._elementLike.classList.toggle('element__like_active');
    });

    this._elementDelete.addEventListener('click', () => {
      this._elementDelete.closest('.element').remove();
    });

    this._elementImage.addEventListener('click', () => this._handleOnClick(this._element));
  }

}
