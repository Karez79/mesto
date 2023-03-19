let profileTitile = document.querySelector('.profile__title');
let profileSubbtitle = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
const saveBtn = document.querySelector('.popup__save-button');
const popupProfileEdit = document.querySelector('#profileEdit');
const openPopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_title');
const jobInput = document.querySelector('.popup__input_type_subtitle');
const closePopupButton = document.querySelector('.popup__close-button');
const popupEditProdileSave = document.querySelector('.popup__form');
const CardButtonAdd = document.querySelector('.profile__add-button')
const CardPopupAdd = document.querySelector('#cardADD');
const CardPopupAddForm = document.querySelector('#cardform');
const closeButtonAdd = document.querySelector('.popup__close-addbutton');
const cardsContainer = document.querySelector('.elements');
const element = document.querySelector('.cards');
const popupBigFoto = document.querySelector('#zoomfoto');
const popupBigFotoTitle = document.querySelector('.popup__title-zoom');
const popupBigFotoImage = document.querySelector('.popup__zoom');
const popupBigFotoCloseBtn = document.querySelector('.popup__close-zoombutton');


//Popup редактирования и сохранения профиля//

openPopupButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitile.textContent;
  jobInput.value = profileSubbtitle.textContent;
  popupProfileEdit.classList.add('popup_opened');
});


closePopupButton.addEventListener('click', () => {
  popupProfileEdit.classList.remove('popup_opened');
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitile.textContent = nameInput.value;
  profileSubbtitle.textContent = jobInput.value;
  popupProfileEdit.classList.remove('popup_opened');
}

//Popup добавления карточи//

CardButtonAdd.addEventListener('click', () => {
  CardPopupAdd.classList.add('popup_opened');
  document.querySelector('.popup__input_type_name').value = '';
  document.querySelector('.popup__input_type_linkimage').value = '';
});

closeButtonAdd.addEventListener('click', () => {
  CardPopupAdd.classList.remove('popup_opened');
});

function handleFormCardAddSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector('.popup__input_type_name').value;
  const link = document.querySelector('.popup__input_type_linkimage').value;
  const card = {
    name: name,
    link: link
  }
  CreateCardManual(card);
  countCards();
  CardPopupAdd.classList.remove('popup_opened');
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

const CreateCard = (fotocard) => {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
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

const CreateCardManual = (fotocard) => {
  element.prepend(CreateCard(fotocard));
}
const CreateCardAuto = (fotocard) => {
  element.append(CreateCard(fotocard));
}

initialCards.forEach(CreateCardAuto);
countCards();

function handleLikeImageCklik(event) {
  event.target.classList.toggle('card__info-heart_active');
}

function handleDeleteButtonCklik(event) {
  const DeleteCard = event.target;
  const card = DeleteCard.closest('.card');
  card.remove();
}

function openZoomPhoto(photo) {
  photo.addEventListener('click', e => {
    popupBigFoto.classList.add('popup_opened');
    popupBigFotoTitle.textContent = e.target.alt;
    popupBigFotoImage.src = e.target.src;
  })
};

function countCards() {
  const openPopupZoomphotos = document.querySelectorAll('.cards__image');
  openPopupZoomphotos.forEach(photo => {
    openZoomPhoto(photo);
  })
};

popupBigFotoCloseBtn.addEventListener('click', () => {
  popupBigFoto.classList.remove('popup_opened');
})
popupEditProdileSave.addEventListener('submit', handleFormSubmit);

CardPopupAddForm.addEventListener('submit', handleFormCardAddSubmit);