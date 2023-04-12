import  {
  initialCards,
  profileTitle,
  profileSubtitle,
  openPopupButton,
  nameInput,
  jobInput,
  addCardButton,
  element,
  popupBigFotoTitle,
  popupBigFotoImage,
  cardName,
  cardImage,
  cardTemplate,
  closeButtons,
  popups,
  popupCardAdd,
  popupProfileEdit,
  popupBigFoto,
  profileForm,
  cardAddForm,
  formConfig,
} from "./constants.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

const profileFormValidator = new FormValidator(formConfig, profileForm);
profileFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);
cardAddFormValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
}

function openPopupWithButton(popup) {
  openPopup(popup);
  const popupBtn = popup.querySelector('.popup__button');
  popupBtn.classList.add("popup__button_disabled");
  popupBtn.disabled = true;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
  profileFormValidator.hideErrors();
  cardAddFormValidator.hideErrors();
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
  createCardManual(card);
  closePopup(popupCardAdd);
}

function openZoomPhoto(photo) {
  openPopup(popupBigFoto);
  popupBigFotoTitle.textContent = photo.alt;
  popupBigFotoImage.src = photo.src;
  popupBigFotoImage.alt = photo.alt;
}

function createCardManual(photoCard) {
  const card = new Card(photoCard, cardTemplate, openZoomPhoto).createCard();
  element.prepend(card);
}
function createCardAuto(photoCard) {
  const card = new Card(photoCard, cardTemplate, openZoomPhoto).createCard();
  element.append(card);
}

initialCards.forEach(createCardAuto);

//Popup редактирования и сохранения профиля//
openPopupButton.addEventListener('click', () => {
  openPopupWithButton(popupProfileEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
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
  openPopupWithButton(popupCardAdd);
  cardAddForm.reset();
});

profileForm.addEventListener('submit', handleFormSubmit);

cardAddForm.addEventListener('submit', handleFormCardAddSubmit);
