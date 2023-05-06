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
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") this.close();
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (event) => {
      const hasTargetClass = (id) => {
        return event.target.classList.contains(id);
      }
      if (hasTargetClass('popup_opened') || hasTargetClass('popup__close')) this.close();
    })
  }
}
