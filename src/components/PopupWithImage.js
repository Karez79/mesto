import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupId) {
    super(popupId);
    this._title = this._popup.querySelector('.popup__title-zoom');
    this._image = this._popup.querySelector('.popup__zoom');
  }
  open = ({name, link}) => {
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }
}
