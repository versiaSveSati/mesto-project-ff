import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import {
  configForm,
  forms,
  editButton,
  addPictureButton,
  nameInput,
  jobInput,
  avatarButton,
} from "../utils/constants.js";
import "./index.css";

//сервер
const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers: {
    authorization: "e57c6b7e-2cf3-4eab-a08c-41493d4a71ed",
    "Content-Type": "application/json",
  },
};

//экземпляр класса Api
const api = new Api(apiConfig);

//экземпляр класса UserInfo
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__text",
  ".profile__avatar"
);

// экземпляр класса Section
const cardsSection = new Section(
  (item) => {
    const cardElement = createNewCard(item);
    cardsSection.addItemAppend(cardElement); // Добавляем элемент в контейнер
    // console.log(item)
  },

  ".cards"
);

//тут хранится наш айдишник
let meID;

//отрисовка массива карточек и информации о пользователее при открытии страницы
Promise.all([api.getName(), api.getCard()])
  .then(([dataUser, dataCard]) => {
    meID = dataUser._id;
    //отрисовали карточки
    cardsSection.renderItems(dataCard);
    //загрузили профиль
    userInfo.setUserInfo(dataUser);
    //  console.log(meID)
  })
  .catch((error) =>
    console.error(`Ошибка при попытке загрузить карточки ${error}`)
  );

//создаем карточку через запрос на сервер
const popupAddPicture = new PopupWithForm("#cards", (data) => {
  popupAddPicture.renderLoading(true);
  api
    .addCard({ name: data["card-name"], link: data["card-link"] })
    .then((dataCard) => {
      cardsSection.addItemPrepend(createNewCard(dataCard));
      popupAddPicture.close();
    })
    .catch((error) =>
      console.error(`Ошибка при попытке добавить карточку ${error}`)
    )
    .finally(() => {
      popupAddPicture.renderLoading(false);
    });
});

//открываем попап для добавления карточки
addPictureButton.addEventListener("click", function () {
  popupAddPicture.open();
});
popupAddPicture.setEventListeners();

//меняем аватарку
const popupAvatar = new PopupWithForm(".popup_type_change-avatar", (data) => {
  popupAvatar.renderLoading(true);
  api
    .changeAvatar({ avatar: data["avatar-link"] })
    .then((item) => {
      userInfo.setUserInfo(item);
      popupAvatar.close();
    })
    .catch((error) =>
      console.error(`Ошибка при попытке сменить аватар ${error}`)
    )
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});

//открыли попап при клике на аватар
avatarButton.addEventListener("click", () => {
  popupAvatar.open();
});
popupAvatar.setEventListeners();

//открыть фотку
const imagePopup = new PopupWithImage(".popup_overlay");
imagePopup.setEventListeners();

// слушаетели событий открытия формы для профиля
editButton.addEventListener("click", editUserInfo);

//изменяем инфу о себе и имя
const popupUserInfo = new PopupWithForm("#profile", (data) => {
  popupUserInfo.renderLoading(true);
  api
    .editProfileInfo({ name: data.name, about: data.job })
    .then((item) => {
      //вызвала еще раз, чтобы инфа в профиле сразу поменялась
      userInfo.setUserInfo(item);
      popupUserInfo.close();
    })
    .catch((error) =>
      console.error(
        `Ошибка при попытке изменить информацию о пользователе ${error}`
      )
    )
    .finally(() => {
      popupUserInfo.renderLoading(false);
    });
});
popupUserInfo.setEventListeners();

//функция изменения инфы в профиле через попап
function editUserInfo() {
  popupUserInfo.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

//подверждение удаления карточки
const popupDeleteCard = new PopupDeleteCard(
  ".popup_type_delete-a-pic",
  ({ card, cardID }) => {
    api
      .deleteCard(cardID)
      .then(() => {
        card.cardTrash();
        popupDeleteCard.close();
      })
      .catch((error) =>
        console.error(`Ошибка при попытке удалить карточки ${error}`)
      );
  }
);
popupDeleteCard.setEventListeners();

//функция создания карточки
function createNewCard(data) {
  const like = (cardId) => {
    return api.addLike(cardId);
  };
  const removeLike = (cardId) => {
    return api.removeLike(cardId);
  };
  const card = new Card(
    data,
    "#elements",
    meID,
    imagePopup.open,
    popupDeleteCard.open,
    like,
    removeLike
  );
  return card.createCard();
}

//валидация
forms.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});