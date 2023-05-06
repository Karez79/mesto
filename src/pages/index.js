import './index.css'; // добавьте импорт главного файла стилей
import {
  addCardButton,
  cardAddForm,
  cardTemplate,
  formConfig,
  initialCards,
  openPopupButton,
  profileForm,
  titleInput,
  subtitleInput,
  profileTitle,
  profileSubtitle,
} from "../scripts/constants.js";

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

const profileFormValidator = new FormValidator(formConfig, profileForm);
profileFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);
cardAddFormValidator.enableValidation();

const popupBigPhoto = new PopupWithImage('#zoomfoto');
popupBigPhoto.setEventListeners();

const userInfo = new UserInfo({titleId: '.popup__input_type_title', subtitleId: '.popup__input_type_subtitle'});

function handleFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.subtitle);
  profileTitle.textContent = userInfo.getUserInfo()['title'];
  profileSubtitle.textContent = userInfo.getUserInfo()['subtitle'];
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
openPopupButton.addEventListener('click', () => {
  popupProfileEdit.open();
  if (profileTitle.textContent || profileSubtitle.textContent) {
    userInfo.setUserInfo(profileTitle.textContent, profileSubtitle.textContent);
  }
  titleInput.value = userInfo.getUserInfo()['title'];
  subtitleInput.value = userInfo.getUserInfo()['subtitle'];
  profileFormValidator.hideErrors();
  profileFormValidator.disableButton();
});

//Popup добавления карточки//
addCardButton.addEventListener('click', () => {
  popupCardAdd.open();
  cardAddForm.reset();
  cardAddFormValidator.hideErrors();
  cardAddFormValidator.disableButton();
});
