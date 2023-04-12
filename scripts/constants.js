// //Фотографии//
const initialCards = [
    {
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
        alt: 'Новозеландский морж.'
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

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
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

const formConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    textErrorClass: ".popup__input-error_type_",
    errorClass: "popup__input_error",
};

export {
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
}