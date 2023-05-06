import tihmorj from '../images/tihmorj.jpg';
import atlantmorj from '../images/atlantmorj.jpg';
import laptmorj from '../images/laptmorj.jpg';
import newzelandkot from '../images/newzelandkot.jpg';
import kapskot from '../images/kapskot.jpg';
import fernandkot from '../images/fernandkot.jpg';


// //Фотографии//
const initialCards = [
    {
        name: 'Тихокеанский морж.',
        link: tihmorj,
    },
    {
        name: 'Атлантический морж.',
        link: atlantmorj,
    },
    {
        name: 'Лапетвый морж.',
        link: laptmorj,
    },
    {
        name: 'Новозеландский морж.',
        link: newzelandkot,
    },
    {
        name: 'Капский морской кот.',
        link: kapskot,
    },
    {
        name: 'Фернандесский морской кот.',
        link: fernandkot,
    }
];

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openPopupButton = document.querySelector('.profile__edit-button');
const titleInput = document.querySelector('.popup__input_type_title');
const subtitleInput = document.querySelector('.popup__input_type_subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#cardTemplate');

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
    titleInput,
    subtitleInput,
    addCardButton,
    cardTemplate,
    profileForm,
    cardAddForm,
    formConfig,
}
