export class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._textErrorClass = config.textErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    _defineElements() {
        this._inputList = this._form.querySelectorAll(this._inputSelector);
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

    _showInputError (input, errorElement, errorMessage) {
        input.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }
    _hideInputError (input, errorElement) {
        input.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }
    _enableButton () {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _getErrorElement(input) {
        return this._form.querySelector(`${this._textErrorClass}${input.name}`)
    }

    _checkInputValidity (input) {
        if (!input.validity.valid) {
            this._showInputError(input, this._getErrorElement(input), input.validationMessage);
        } else {
            this._hideInputError(input, this._getErrorElement(input));
        }
    }

    _getInvalidInputs() {
        const inputListArray = [...this._inputList];
        return inputListArray.filter(input => !input.validity.valid).length === 0;
    }

    _toggleButton () {
        if (this._getInvalidInputs()) {
            this._enableButton();
        } else {
            this.disableButton();
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButton()
            })
        });
    }

    hideErrors() {
        this._inputList.forEach(input => {
            this._hideInputError(input, this._getErrorElement(input));
        })
    }

    enableValidation() {
        this._defineElements();
        this._setEventListeners();
    }

    resetValidation() {
        this.hideErrors();
        this.disableButton();
    }
}
