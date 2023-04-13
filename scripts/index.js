import {
  addCardButton,
  cardAddForm,
  cardImage,
  cardName,
  cardsList,
  cardTemplate,
  closeButtons,
  formConfig,
  initialCards,
  jobInput,
  nameInput,
  openPopupButton,
  popupBigFoto,
  popupBigFotoImage,
  popupBigFotoTitle,
  popupCardAdd,
  popupProfileEdit,
  popups,
  profileForm,
  profileSubtitle,
  profileTitle,
} from "./constants.js";
import {Card} from "./card.js";
import {FormValidator} from "./formValidator.js";

const profileFormValidator = new FormValidator(formConfig, profileForm);
profileFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);
cardAddFormValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handleFormCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardImage.value;
  const card = {
    name: name,
    link: link
  }

  cardsList.prepend(createCard(card));
  closePopup(popupCardAdd);
}

function openZoomPhoto(photo) {
  openPopup(popupBigFoto);
  popupBigFotoTitle.textContent = photo.name;
  popupBigFotoImage.alt = photo.name;
  popupBigFotoImage.src = photo.link;
}

function createCard(photoCard) {
  return new Card(photoCard, cardTemplate, openZoomPhoto).createCard();
}

initialCards.forEach(card => {
  cardsList.append(createCard(card))
});

//Popup редактирования и сохранения профиля//
openPopupButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileFormValidator.hideErrors();
  profileFormValidator.disableButton();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Popup добавления карточи//
addCardButton.addEventListener('click', () => {
  openPopup(popupCardAdd);
  cardAddForm.reset();
  cardAddFormValidator.hideErrors();
  cardAddFormValidator.disableButton();
});

profileForm.addEventListener('submit', handleFormSubmit);
cardAddForm.addEventListener('submit', handleFormCardAddSubmit);
