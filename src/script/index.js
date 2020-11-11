import { initialCards } from "./initial-cards.js"; //импорт начальных карточек
import Card from "./Card.js"; //импорт стартовых карточек
import FormValidator from "./FormValidator.js"; //импорт валидации
import Section from "./Section.js"; //импорт валидации
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import "../style/index.css";
import "../images/button-eadit.png.png";
import "../images/Close Icon.svg";
import "../images/cross.svg";
import "../images/edit_buton.svg";
import "../images/grid-card__del.svg";
import "../images/kusto.jpg";
import "../images/like.svg";
import "../images/like_active.svg";
import "../images/logo.png";
import "../images/logo.svg";
import "../images/Rectangle.svg";
import "../images/Rectangle.svg";
import "../images/© 2020 Mesto Russia.svg";
import "../images/домбай.3.png";
import "../images/карачаево.1.jpg";
import "../images/эльбрус.2.png";

//Форма профиля
const profilePopup = document.querySelector(".popup_profile");
const buttonEdit = document.querySelector(".profile__button-edit");
const profileButtonClose = profilePopup.querySelector(".popup__close-button");
const profileInputName = profilePopup.querySelector(".form__contact-name");
const profileInputInfo = profilePopup.querySelector(".form__contact-interst");
const profileName = document.querySelector(".profile__name");
const profileInterst = document.querySelector(".profile__interst");
const form = document.querySelector(".form");

//Попап Add-image
const imagePopup = document.querySelector(".popup_add-img");
const imageAddPopupButton = document.querySelector(".profile__button-add");

const userInfo = new UserInfo(".profile__name", ".profile__interst");
const popupImage = new PopupWithImage(".popup_big-pic");

function addCardToPage(data) {
    console.log(`add crad data: ${data.name} ${data.link}`);
    console.log(`add crad data2: ${data["item-name"]} ${data.url}`);
    /*Создаем объект карточки*/
    const card = new Card(
        data,
        {
            // Обработчик клика по картинке карточки
            openImagePopup: () => {
                const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки
                popupImage.setEventListeners();
                popupImage.open(cardInfo);
            },
        },
        "#card-template"
    );
    const cardNode = card.createCard(); // Вставляем разметку
    cardsList.addItem(cardNode); // Добавляем на страницу
}

/*Создаем объект секции*/
const cardsList = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            addCardToPage(item);
        },
    },
    ".cards-container"
);

/*Создаем объект для попапа редактирования профиля*/
const popupEditProfile = new PopupWithForm(
    {
        //Обработчик кнопки Сохранить
        handleSubmit: (inputValues) => {
            userInfo.setUserInfo(inputValues); // Вставляем данные на страницу
            popupEditProfile.close();
            editProfileValidation.resetForm(); // Очищаем поля при сохранении
        },
        //Очищаем поля при закрытии
        resetForm: () => {
            editProfileValidation.resetForm();
        },
    },
    ".popup_profile"
);

/*Создаем объект для попапа добавления карточки*/
const popupAddCard = new PopupWithForm(
    {
        //Обработчик кнопки Создать
        handleSubmit: (inputValues) => {
            addCardToPage(inputValues);
            popupAddCard.close();
            addCardValidation.resetForm(); // Очищаем поля при Создании
        },
        // Очищаем поля при закрытии
        resetForm: () => {
            addCardValidation.resetForm();
        },
    },
    ".popup_add-img"
);

/* Отрисовка начальных карточек на страницу*/
cardsList.renderItems();

/*Добавляем слушатели событий*/
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
buttonEdit.addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    popupEditProfile.popup.querySelector(".form__contact-name").value =
        info.name;
    popupEditProfile.popup.querySelector(".form__contact-interst").value =
        info.interst;
    popupEditProfile.open();
});
imageAddPopupButton.addEventListener("click", () => {
    popupAddCard.open();
});

// ВАЛИДАЦИЯ //
/*Выбираем форму и ее элементы для валидации */
const formSelectors = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, profilePopup);
const addCardValidation = new FormValidator(formSelectors, imagePopup);

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
