export class Popup {
  constructor(popupId) {
    this._popup = document.querySelector(popupId);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") this.close();
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', () => {
      const classList = this._popup.classList;
      if (!classList.contains('popup_opened') || classList.contains('popup__close')) this.close();
    })
  }
}
