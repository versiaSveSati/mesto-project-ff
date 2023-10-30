
const configForm = {
    formSelector: ".popup__forms",
    inputSelector: ".popup__form",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_type_invalid",
    inputErrorClass: "popup__form_type_invalid",
    formItemErrorClass: "popup__error",
};

const forms = document.querySelectorAll(".popup__forms");
//попап с профилем
const popupProfile = document.querySelector("#profile");
const editButton = document.querySelector(".profile__pencil");
//попап с добавлением картинок
const addPictureButton = document.querySelector(".profile__plus");
//находим форму для имени и работы
const profileFormElement = popupProfile.querySelector(".popup__forms");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#profession");

//кнопка для аватара
const avatarButton = document.querySelector('.profile__avatar-button');


export { configForm, forms, editButton, addPictureButton, nameInput, jobInput, avatarButton };