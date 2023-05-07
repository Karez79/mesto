import './index.css'; // добавьте импорт главного файла стилей
import {
  addCardButton,
  cardAddForm,
  cardTemplate,
  formConfig,
  initialCards,
  openProfileEditButton,
  profileForm,
} from "../scripts/constants.js";

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

enableValidation(formConfig);

const popupBigPhoto = new PopupWithImage('#zoomfoto');
popupBigPhoto.setEventListeners();

const userInfo = new UserInfo({nameId: '.profile__name', aboutId: '.profile__about'});

function handleFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
}

function createCard(photoCard) {
  return new Card(photoCard, cardTemplate, popupBigPhoto.open).createCard();
}

const section = new Section({ items: initialCards, renderer: createCard}, '.cards');
section.renderElements();

function handleFormCardAddSubmit(inputValues) {
  const card = {
    name: inputValues.name,
    link: inputValues.link,
  }

  section.addItem(card);
}

const popupCardAdd = new PopupWithForm('#cardADD', handleFormCardAddSubmit);
const popupProfileEdit = new PopupWithForm( '#profileEdit', handleFormSubmit);
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();

//Popup редактирования и сохранения профиля//
openProfileEditButton.addEventListener('click', () => {
  popupProfileEdit.open();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  formValidators[profileForm.getAttribute('name')].resetValidation();
});

//Popup добавления карточки//
addCardButton.addEventListener('click', () => {
  popupCardAdd.open();
  formValidators[cardAddForm.getAttribute('name')].resetValidation();
});
