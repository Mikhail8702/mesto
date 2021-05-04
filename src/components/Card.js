
export class Card {
  constructor (item, userId, elementTemplate, handleCardClick, handleDeleteClick, addLikes, removeLike) {

    this._text = item.name;
    this._image = item.link;
    this._owner = item.owner._id;
    this._id = item._id;
    this._userId = userId;
    this._addLike = addLikes;
    this._removeLike = removeLike;
    this._userLikes = item.likes;
    this._template = elementTemplate;
    this._handleOnClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;

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
    this._likeQuant = this._element.querySelector('.element__like-quant');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;
    this._likeQuant.textContent = this._userLikes.length;
    if (this._owner != this._userId) {
      this._element.querySelector('.element__delete').remove();
    }
    this._userLikes.some(element => {
      if(element._id === this._userId) {
        this._elementLike.classList.add('element__like_active');
      }
    });

    return this._element;
  }

  _checkUserLike() {
    if (this._elementLike.classList.contains('element__like_active')) {
      this._removeLike(this._id, this._element);
      this._elementLike.classList.remove('element__like_active');
    }
    else {
      this._addLike(this._id, this._element);
      this._elementLike.classList.add('element__like_active');
    }
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');

    this._elementLike.addEventListener('click', () => {
      this._checkUserLike();
    });

    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._elementImage.addEventListener('click', () => this._handleOnClick(this._text, this._image));
  }

}
