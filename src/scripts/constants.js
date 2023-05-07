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

const openProfileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#cardTemplate');

// forms
const profileForm = document.querySelector('#profileForm');
const cardAddForm = document.querySelector('#cardform');

const formConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    textErrorClass: ".popup__input-error_type_",
    errorClass: "popup__input_error",
};

export {
    initialCards,
    openProfileEditButton,
    addCardButton,
    cardTemplate,
    profileForm,
    cardAddForm,
    formConfig,
}
