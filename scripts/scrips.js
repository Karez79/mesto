let profileTitile = document.querySelector('.profile__title');
let profileSubbtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_title');
let jobInput = document.querySelector('.popup__input_type_subtitle');
let popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const saveBtn = document.querySelector('.popup__save-button');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitile.textContent = nameInput.value;
  profileSubbtitle.textContent = jobInput.value;
  closePopup();
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitile.textContent;
  jobInput.value = profileSubbtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


openPopupButton.addEventListener('click', openPopup);


closePopupButton.addEventListener('click', closePopup);