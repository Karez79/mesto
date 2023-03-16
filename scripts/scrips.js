
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
const CardPopupAdd = document.querySelector('#cardADD');
const CardButtonAdd = document.querySelector('.profile__add-button');
const closeButtonAdd = document.querySelector('.popup__close-addbutton');
const CardContainer = document.querySelector('.card');

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

popupEditProdileSave.addEventListener('submit', handleFormSubmit);



//Popup добавления карточи//



CardButtonAdd.addEventListener('click', () => {
  CardPopupAdd.classList.add('popup_opened');
  document.querySelector('.popup__input_type_name').value = '';
  document.querySelector('.popup__input_type_linkimage').value = '';
});

closeButtonAdd.addEventListener('click', () => {
  CardPopupAdd.classList.remove('popup_opened');
  
});



//Фотографии//

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


let changeColor = document.querySelector('.card__info');
changeColor.querySelector('.card__info-heart').addEventListener('click', function (event) {
  event.target.classList.toggle('card__info-heart_active');
})


let deleteFoto = CardContainer.querySelector('.cards__delete-foto');
  deleteFoto.addEventListener('click', function (event) {
    event.target.closest('.card').remove();
  });


  const cardTemplate = document.querySelector('#cardtemplate').content;
  const card = cardTemplate.querySelector('.cards').cloneNode(true);