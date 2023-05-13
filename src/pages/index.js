import './index.css'; // добавьте импорт главного файла стилей
import {
    addCardButton,
    cardAddForm,
    cardTemplate,
    formConfig,
    openProfileEditButton,
    openAvatarEditButton,
    profileForm,
    avatarForm,
} from '../scripts/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithButton} from '../components/PopupWithButton.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: 'bad0a43e-1805-4faf-8465-a8ef0cb6b6aa',
        'Content-Type': 'application/json',
    },
});

const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(formConfig);

const popupBigPhoto = new PopupWithImage('#zoomfoto');
popupBigPhoto.setEventListeners();

const userInfo = new UserInfo({
    nameId: '.profile__name',
    aboutId: '.profile__about',
    avatarId: '.profile__avatar',
});

const section = new Section({renderer: createCard}, '.cards');

const popupCardAdd = new PopupWithForm(
    '#cardADD',
    handleCardAddFormSubmit
);
const popupProfileEdit = new PopupWithForm(
    '#profileEdit',
    handleProfileFormSubmit
);
const popupAvatarEdit = new PopupWithForm(
    '#avatarEdit',
    handleAvatarFormSubmit
);
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();

const popupCardDelete = new PopupWithButton(
    '#cardDelete',
    handleCardDelete
);
popupCardDelete.setEventListeners();

api
    .getProfile()
    .then((res) => {
        // обрабатываем результат
        userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

function handleProfileFormSubmit(data) {
    popupProfileEdit.setSubmitButtonPending();
    api
        .editProfile(data)
        .then((result) => {
            // обрабатываем результат
            userInfo.setUserInfo(result.name, result.about, result.avatar);
            popupProfileEdit.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupProfileEdit.resetSubmitButton();
        });
}

function handleAvatarFormSubmit(data) {
    popupAvatarEdit.setSubmitButtonPending();
    api
        .editAvatar(data.avatar)
        .then((result) => {
            // обрабатываем результат
            userInfo.setAvatar(result.avatar);
            popupAvatarEdit.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupAvatarEdit.resetSubmitButton();
        });
}

function handleCardAddFormSubmit(data) {
    const card = {
        name: data.name,
        link: data.link,
    };
    popupCardAdd.setSubmitButtonPending();
    api
        .addCard(card)
        .then((result) => {
            // обрабатываем результат
            section.addItem(result);
            popupCardAdd.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupCardAdd.resetSubmitButton();
        });
}

function handleLike(cardId, changeLikesCounter, changeLikeStatus, isCardLiked) {
    if (isCardLiked) {
        api.deleteLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    } else {
        api.addLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }
}

function handleCardDelete(cardId, deleteCard) {
    popupCardDelete.setButtonPending();
    api.deleteCard(cardId)
        .then((result) => {
            deleteCard();
            popupCardDelete.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupCardDelete.resetButton();
        });
}

function createCard(photoCard) {
    return new Card(photoCard, cardTemplate, popupBigPhoto.open, handleLike, popupCardDelete.open, userInfo.getUserId()).createCard();
}

api
    .getInitialCards()
    .then((result) => {
        // обрабатываем результат
        section.renderElements(result);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

//Popup редактирования и сохранения профиля//
openProfileEditButton.addEventListener('click', () => {
    popupProfileEdit.open();
    popupProfileEdit.setInputValues(userInfo.getUserInfo());
    formValidators[profileForm.getAttribute('name')].resetValidation();
});

//Popup редактирования аватара//
openAvatarEditButton.addEventListener('click', () => {
    popupAvatarEdit.open();
    formValidators[avatarForm.getAttribute('name')].resetValidation();
});

//Popup добавления карточки//
addCardButton.addEventListener('click', () => {
    popupCardAdd.open();
    formValidators[cardAddForm.getAttribute('name')].resetValidation();
});
