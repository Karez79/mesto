const profileTitile = document.querySelector('.profile__title');
const profileSubbtitle = document.querySelector('.profile__subtitle');
const saveBtn = document.querySelector('.popup__save-button');
const popupProfileEdit = document.querySelector('#profileEdit');
const openPopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_title');
const jobInput = document.querySelector('.popup__input_type_subtitle');
const closePopupButton = document.querySelector('.popup__close-button');
const popupEditProdileSave = document.querySelector('.popup__form');
const cardButtonAdd = document.querySelector('.profile__add-button')
const cardPopupAdd = document.querySelector('#cardADD');
const cardPopupAddForm = document.querySelector('#cardform');
const closeButtonAdd = document.querySelector('.popup__close-addbutton');
const cardsContainer = document.querySelector('.elements');
const element = document.querySelector('.cards');
const popupBigFoto = document.querySelector('#zoomfoto');
const popupBigFotoTitle = document.querySelector('.popup__title-zoom');
const popupBigFotoImage = document.querySelector('.popup__zoom');
const popupBigFotoCloseBtn = document.querySelector('.popup__close-zoombutton');
const popup = document.querySelector('.popup');
const cardName = document.querySelector('.popup__input_type_name');
const cardImage = document.querySelector('.popup__input_type_linkimage');
const cardTemplate = document.querySelector('#cardTemplate');
const closeButtons = document.querySelectorAll('.popup__close');

//Popup редактирования и сохранения профиля//

openPopupButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  nameInput.value = profileTitile.textContent;
  jobInput.value = profileSubbtitle.textContent;
  
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


// closePopupButton.addEventListener('click', () => {
//   closePopup(popupProfileEdit);
// });

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitile.textContent = nameInput.value;
  profileSubbtitle.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

//Popup добавления карточи//

cardButtonAdd.addEventListener('click', () => {
  openPopup(cardPopupAdd);
  document.getElementById("cardform").reset();
  
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
  countCards();
  closePopup(cardPopupAdd);
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

  return newCard;
}

const createCardManual = (fotocard) => {
  element.prepend(createCard(fotocard));
}
const createCardAuto = (fotocard) => {
  element.append(createCard(fotocard));
}

initialCards.forEach(createCardAuto);
countCards();

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
};

function countCards() {
  const openPopupZoomphotos = document.querySelectorAll('.cards__image');
  openPopupZoomphotos.forEach(photo => {
    openZoomPhoto(photo);
  })
};

// popupBigFotoCloseBtn.addEventListener('click', () => {
//   closePopup(popupBigFoto);
// })
popupEditProdileSave.addEventListener('submit', handleFormSubmit);

cardPopupAddForm.addEventListener('submit', handleFormCardAddSubmit);