
import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings } from "../utils/constant.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import Api from '../components/Api.js';

const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupAvatar = document.querySelector('.popup_avatar');
const popupAsk = document.querySelector('.popup_ask');
const submitElementProfileForm = document.querySelector('.popup__form-profile');
const submitElementAddForm = document.querySelector('.popup__form-add');
const cardsTemplate = document.querySelector('#cardstemplate').content;
const nameInput = document.querySelector('#nameInput');
const infInput = document.querySelector('#infInput');
const titleInput = document.querySelector('#titleInput');
const linkInput = document.querySelector('#linkInput');
const buttonOpenPopupEditProfile = document.querySelector('.profile-main__edit-button');
const buttonOpenPopupAddCard = document.querySelector('.profile-main__button');
const authorElement = document.querySelector('.profile-main__author');
const jobElement = document.querySelector('.profile-main__job');
const profileAvatarContainer = document.querySelector('.profile-main__avatar-container');
const avatarElement = document.querySelector('.profile-main__avatar-size');
const buttonClosePopupEditProfile = document.querySelector('.popup__close');
const buttonClosePopupAddCard = document.querySelector('.popup__close_add');
const buttonClosePopupPhoto = document.querySelector('.popup__close_photo');
const popupPictureAdd = document.querySelector('.popup__picture');
const popupSubtitleAdd = document.querySelector('.popup__subtitle-photo');
const popupSaveButton = document.querySelector('.popup__button_save');
const cardFormSubmitButton = document.querySelector('.popup__button_add');
const elementsGrid = document.querySelector('.elements-grid');
const likeButton = document.querySelector('.elements-grid__icon');

//API
const imagePopup = new PopupWithImage(popupPhoto);
const userInfo = new UserInfo(authorElement, jobElement, avatarElement);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: "e57c6b7e-2cf3-4eab-a08c-41493d4a71ed",
        "Content-Type": "application/json",
    },
});

let userId;

const avatarChangeValidation = new FormValidator(validationSettings, popupAvatar);
avatarChangeValidation.enableValidation();

// Получаем и устанавоиваем данныес свервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        console.log(userData)
        userInfo.setUserInfo(userData);
        userId = userData._id;
        defaultCards.rendererItems(cards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

const popupConfirmDelete = new PopupConfirmDelete(popupAsk);
popupConfirmDelete.setEventListeners();

buttonOpenPopupEditProfile.addEventListener("click", () => {
    infoPopupForm.setInputValues(userInfo.getUserInfo());
    infoPopupForm.open();
    validateEditForm.resetValidation();
});

const createCard = (item) => {
    const card = new Card(
        {
            data: item,
            ownerId: item.owner._id,
            userId: userId,
            handleCardClick: (link, name) => {
                imagePopup.open(link, name);
            },
            handleDeleteIconclick: () => {
                popupConfirmDelete.open();
                popupConfirmDelete.setSubmitAction(() => {
                    api.deleteCard(card.getCardId())
                        .then(() => {
                            card.deleteCard();
                            popupConfirmDelete.close();
                        })
                        .catch((err) => {
                            console.log(`Ошибка: ${err}`);
                        });
                });
            },
            handleLikeIconClick: () => {
                if (card.cardIsLiked()) {
                    api.removeLike(card.getCardId())
                        .then((data) => {
                            card.updateLikeNumbers(data.likes);
                        })
                        .catch((err) => {
                            console.log(`Ошибка: ${err}`);
                        });
                } else {
                    api.putLike(card.getCardId())
                        .then((data) => {
                            card.updateLikeNumbers(data.likes);
                        })
                        .catch((err) => {
                            console.log(`Ошибка: ${err}`);
                        });
                }
            },
        },
        "#cardstemplate"
    );
    return card.createCard();
}
imagePopup.setEventListeners();

const defaultCards = new Section({
    renderer: (item) => {
        defaultCards.addItem(createCard(item));
    },
},
    elementsGrid
);

const avatarChangeForm = new PopupWithForm(popupAvatar, {
    handleFormSubmitAdd: (data) => {
        avatarChangeForm.renderLoading(true);
        api.changeUserAvatar(data)
            .then((data) => {
                userInfo.setUserInfo(data);
                avatarChangeForm.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                avatarChangeForm.renderLoading(false);
            });
    },
});
avatarChangeForm.setEventListeners();


profileAvatarContainer.addEventListener("click", () => {
    avatarChangeForm.open();
    avatarChangeValidation.resetValidation();
});

const popupAdd = new PopupWithForm(popupAddCard, {
    handleFormSubmitAdd: (data) => {
        popupAdd.renderLoading(true);
        api.addNewCard(data)
            .then((res) => {
                defaultCards.addItem(createCard(res));
                defaultCards.addNewItem(createCard(res));
                popupAdd.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupAdd.renderLoading(false);
            });
    },
});
popupAdd.setEventListeners();

const infoPopupForm = new PopupWithForm(popupProfile, {
    handleFormSubmitAdd: (data) => {
        infoPopupForm.renderLoading(true);
        api
            .changeUserInfo(data)
            .then((data) => {
                userInfo.setUserInfo(data);
                infoPopupForm.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                infoPopupForm.renderLoading(false);
            });
    },
});
infoPopupForm.setEventListeners();

buttonOpenPopupEditProfile.addEventListener("click", () => {
    infoPopupForm.setInputValues(userInfo.getUserInfo());
    infoPopupForm.open();
    validateEditForm.resetValidation();
});

const validateEditForm = new FormValidator(validationSettings, submitElementProfileForm);
validateEditForm.enableValidation();

buttonOpenPopupAddCard.addEventListener("click", () => {
    popupAdd.open();
    validateAddForm.resetValidation();
});

const validateAddForm = new FormValidator(validationSettings, submitElementAddForm);
validateAddForm.enableValidation();