const openProfileEditButton = document.querySelector('.profile__edit-button');
const openAvatarEditButton = document.querySelector('.profile__avatar-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#cardTemplate');

// forms
const profileForm = document.querySelector('#profileForm');
const avatarForm = document.querySelector('#avatarForm');
const cardAddForm = document.querySelector('#cardform');

const formConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    textErrorClass: ".popup__input-error_type_",
    errorClass: "popup__input_error",
};

export {
    openProfileEditButton,
    openAvatarEditButton,
    addCardButton,
    cardTemplate,
    profileForm,
    avatarForm,
    cardAddForm,
    formConfig,
}
