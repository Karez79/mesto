const profileTitile = document.querySelector('.profile__title');
const profileSubbtitle = document.querySelector('.profile__subtitle');
const openPopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_title');
const jobInput = document.querySelector('.popup__input_type_subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const element = document.querySelector('.cards');
const popupBigFotoTitle = document.querySelector('.popup__title-zoom');
const popupBigFotoImage = document.querySelector('.popup__zoom');
const cardName = document.querySelector('.popup__input_type_name');
const cardImage = document.querySelector('.popup__input_type_linkimage');
const cardTemplate = document.querySelector('#cardTemplate');
const closeButtons = document.querySelectorAll('.popup__close');

// popups
const popups = document.querySelectorAll('.popup');
const popupCardAdd = document.querySelector('#cardADD');
const popupProfileEdit = document.querySelector('#profileEdit');
const popupBigFoto = document.querySelector('#zoomfoto');

// forms
const profileForm = document.querySelector('#profileForm');
const cardAddForm = document.querySelector('#cardform');

//Popup редактирования и сохранения профиля//

openPopupButton.addEventListener('click', () => {
  openPopupWithButton(popupProfileEdit);
  nameInput.value = profileTitile.textContent;
  jobInput.value = profileSubbtitle.textContent;
});

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
}

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

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitile.textContent = nameInput.value;
  profileSubbtitle.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

//Popup добавления карточи//

addCardButton.addEventListener('click', () => {
  openPopupWithButton(popupCardAdd);
  cardAddForm.reset();
});


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

// //Фотографии//
const initialCards = [{
    name: 'Тихокеанский морж.',
    link: './images/tihmorj.jpeg',
    alt: 'Тихокеанский морж.'
  },
  {
    name: 'Атлантический морж.',
    link: './images/atlantmorj.jpeg',
    alt: 'Атлантический морж.'
  },
  {
    name: 'Лапетвый морж.',
    link: './images/laptmorj.jpeg',
    alt: 'Лаптевый морж.'
  },
  {
    name: 'Новозеландский морж.',
    link: './images/newzelandkot.jpeg',
    alt: '>Новозеландский морж.'
  },
  {
    name: 'Капский морской кот.',
    link: './images/kapskot.jpeg',
    alt: 'Капский морской кот.'
  },
  {
    name: 'Фернандесский морской кот.',
    link: './images/fernandkot.jpeg',
    alt: 'Фернандесский морской кот.'
  }
];

// Создание/сохранение карт + лайки//

const createCard = (fotocard) => {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardHeading = newCard.querySelector('.card__info-title');
  cardHeading.textContent = fotocard.name;
  const cardImage = newCard.querySelector('.cards__image');
  cardImage.setAttribute('src', fotocard.link);
  cardImage.setAttribute('alt', fotocard.name);
  const deleteButtonCard = newCard.querySelector('.cards__delete-foto');
  deleteButtonCard.addEventListener('click', handleDeleteButtonCklik);
  const changeColor = newCard.querySelector('.card__info-heart');
  changeColor.addEventListener('click', handleLikeImageCklik);
  const openPopupZoomPhoto = newCard.querySelector('.cards__image');
  openZoomPhoto(openPopupZoomPhoto);
  return newCard;
}

const createCardManual = (fotocard) => {
  element.prepend(createCard(fotocard));
}
const createCardAuto = (fotocard) => {
  element.append(createCard(fotocard));
}

initialCards.forEach(createCardAuto);
// countCards();

function handleLikeImageCklik(event) {
  event.target.classList.toggle('card__info-heart_active');
}

function handleDeleteButtonCklik(event) {
  const deleteCard = event.target;
  const card = deleteCard.closest('.card');
  card.remove();
}

function openZoomPhoto(photo) {
  photo.addEventListener('click', e => {
    openPopup(popupBigFoto);
    popupBigFotoTitle.textContent = e.target.alt;
    popupBigFotoImage.src = e.target.src;
    popupBigFotoImage.alt = e.target.alt;
  })
}

profileForm.addEventListener('submit', handleFormSubmit);

cardAddForm.addEventListener('submit', handleFormCardAddSubmit);
