export class Card {
    constructor(data, cardTemplate, openZoomPhoto) {
        this._photoCard = data;
        this._cardTemplate = cardTemplate;
        this._openZoomPhoto = openZoomPhoto;
    }

    _defineCard() {
        this._card = this._cardTemplate.content.querySelector('.card').cloneNode(true);
    }

    _defineCardElements() {
        this._cardHeading = this._card.querySelector('.card__info-title');
        this._cardImage = this._card.querySelector('.cards__image');
        this._deleteButtonCard = this._card.querySelector('.cards__delete-photo');
        this._likeButton = this._card.querySelector('.card__info-heart');
    }
    _setCardElements() {
        this._cardHeading.textContent = this._photoCard.name;
        this._cardImage.setAttribute('src', this._photoCard.link);
        this._cardImage.setAttribute('alt', this._photoCard.name);
    }

    _handleLikeImageClick() {
        this._likeButton.classList.toggle('card__info-heart_active');
    }

    _handleDeleteButtonClick() {
        this._card.remove();
        this._card = null;
    }

    _handleOpenZoomClick() {
        this._openZoomPhoto(this._photoCard);
    }

    _addListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeImageClick();
        });
        this._deleteButtonCard.addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleOpenZoomClick();
        });
    }

    createCard() {
        this._defineCard();
        this._defineCardElements();
        this._setCardElements();
        this._addListeners();

        return this._card;
    }
}
