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
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65', headers: {
        authorization: 'bad0a43e-1805-4faf-8465-a8ef0cb6b6aa', 'Content-Type': 'application/json',
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
    nameId: '.profile__name', aboutId: '.profile__about', avatarId: '.profile__avatar',
});

const section = new Section({renderer: createCard}, '.cards');

const popupCardAdd = new PopupWithForm('#cardADD', handleCardAddFormSubmit);
const popupProfileEdit = new PopupWithForm('#profileEdit', handleProfileFormSubmit);
const popupAvatarEdit = new PopupWithForm('#avatarEdit', handleAvatarFormSubmit);
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();

const popupCardDelete = new PopupWithButton('#cardDelete', handleCardDelete);
popupCardDelete.setEventListeners();

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        section.renderElements(cards);
    })
    .catch((err) => {
        console.log(err);
    });

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
    popupInstance.renderLoading(true, loadingText);
    request()
        .then(() => {
            popupInstance.close()
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupInstance.renderLoading(false);
        });
}

function handleProfileFormSubmit(inputValues) {
    function makeRequest() {
        return api.editProfile(inputValues).then((userData) => {
            userInfo.setUserInfo(userData)
        });
    }

    handleSubmit(makeRequest, popupProfileEdit);
}

function handleAvatarFormSubmit(inputValues) {
    function makeRequest() {
        return api.editAvatar(inputValues.avatar).then((result) => {
            userInfo.setAvatar(result.avatar);
        });
    }

    handleSubmit(makeRequest, popupAvatarEdit);
}

function handleCardAddFormSubmit(inputValues) {
    function makeRequest() {
        return api.addCard(inputValues).then((result) => {
            section.addItem(result);
        });
    }

    handleSubmit(makeRequest, popupCardAdd);
}
function handleCardDelete(cardId, deleteCard) {
    function makeRequest() {
        return api.deleteCard(cardId).then(() => {
            deleteCard();
        });
    }

    handleSubmit(makeRequest, popupCardDelete, 'Удаление...');
}

function handleLike(cardId, changeLikesCounter, changeLikeStatus, isCardLiked) {
    if (isCardLiked) {
        api.deleteLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.addLike(cardId)
            .then((result) => {
                changeLikesCounter(result.likes);
                changeLikeStatus();
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function createCard(photoCard) {
    return new Card(photoCard, cardTemplate, popupBigPhoto.open, handleLike, popupCardDelete.open, userInfo.getUserId()).createCard();
}

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
