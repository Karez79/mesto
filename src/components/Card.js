export class Card {
    constructor(data, cardTemplate, openZoomPhoto, handleLike, handleDeleteCard, userId) {
        this._photoCard = data;
        this._photoCardId = data._id;
        this._likes = data.likes;
        this._ownerId = this._photoCard.owner._id;
        this._cardTemplate = cardTemplate;
        this._openZoomPhoto = openZoomPhoto;
        this._handleLike = handleLike;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        this._templateCard = this._defineCard();
        this._cardLikesCounter = this._templateCard.querySelector('.card__info-likes-counter');
        this._cardHeading = this._templateCard.querySelector('.card__info-title');
        this._cardImage = this._templateCard.querySelector('.cards__image');
        this._deleteButtonCard = this._templateCard.querySelector('.cards__delete-photo');
        this._likeButton = this._templateCard.querySelector('.card__info-likes-button');
    }

    _defineCard() {
        return this._cardTemplate.content.querySelector('.card').cloneNode(true);
    }

    _defineDeleteButton() {
        if (this._ownerId !== this._userId) {
            this._deleteButtonCard.classList.add('cards__delete-photo_invisible');
            this._deleteButtonCard.disabled = true;
        }
    }

    _isCardLiked() {
        return Boolean(this._likes.find(like => {
            return like._id === this._userId
        }));
    }

    _defineLikeButton() {
        if (this._isCardLiked()) {
            this._likeButton.classList.add('card__info-likes-button_active');
        }
    }

    _setCardElements() {
        this._cardHeading.textContent = this._photoCard.name;
        this._cardImage.setAttribute('src', this._photoCard.link);
        this._cardImage.setAttribute('alt', this._photoCard.name);
    }

    _setLikesCounter() {
        this._cardLikesCounter.textContent = this._likes.length;
    }

    _changeLikesCounter = (likes) => {
        this._likes = likes;
        this._cardLikesCounter.textContent = this._likes.length;
    }

    _changeLikeStatus = () => {
        this._likeButton.classList.toggle('card__info-likes-button_active');
    }

    _handleDeleteButtonClick = () => {
        this._templateCard.remove();
        this._templateCard = null;
    }

    _handleOpenZoomClick() {
        this._openZoomPhoto(this._photoCard);
    }

    _addListeners() {
        this._likeButton.addEventListener('click', (event) => {
            if (this._isCardLiked()) {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, true)
            } else {
                this._handleLike(this._photoCardId, this._changeLikesCounter, this._changeLikeStatus, false)
            }
        });
        this._deleteButtonCard.addEventListener('click', () => {
            this._handleDeleteCard(this._photoCardId, this._handleDeleteButtonClick);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleOpenZoomClick();
        });
    }

    createCard() {
        this._defineCard();
        this._setCardElements();
        this._setLikesCounter();
        this._defineDeleteButton();
        this._defineLikeButton();
        this._addListeners();

        return this._templateCard;
    }
}
