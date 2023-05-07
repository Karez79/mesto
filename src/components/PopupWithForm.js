import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupId, submitFormCallback) {
    super(popupId);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('form');
    this._inputs = this._form.querySelectorAll('input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach( input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFormCallback(this._getInputValues())
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
