
import { initialCards } from './initial-cards.js'; //импорт начальных карточек
import Card from './Card.js'; //импорт стартовых карточек
import FormValidator from './FormValidator.js';//импорт валидации


//Форма профиля
const profilePopup = document.querySelector(".popup_profile");
const buttonEdit = document.querySelector(".profile__button-edit");
const profileButtonClose = profilePopup.querySelector(".popup__close-button");
const profileInputName = profilePopup.querySelector(".form__contact-name");
const profileInputInfo = profilePopup.querySelector(".form__contact-interst");
const profileName = document.querySelector(".profile__name");
const profileInterst = document.querySelector(".profile__interst");
const form = document.querySelector('.form');


/* Открываем попап */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    addPopupCloseHandler(popup); /*закрываем клавишей esc и клик по оверлей */
}

/*Закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removePopupHandler(popup); /*удаляем обработчик клавиши esc и клик по оверлей */
}

/*Функция, закрывающая попап по Escape или при клике по оверлею*/
function closePopupEscOverLay(evt) {
    const popupOpened = document.querySelector('.popup_opened');

    if (evt.key === 'Escape' || evt.target === popupOpened) {
        closePopup(popupOpened);
    }
}

/*Навешиваем обработчики для закрытия попапа по Escape и по клику по оверлею*/
function addPopupCloseHandler(popup) {
    document.body.addEventListener('keyup', closePopupEscOverLay);
    popup.addEventListener('click', closePopupEscOverLay);
}

/*Удаляем обработчики*/
function removePopupHandler(popup) {
    document.body.removeEventListener('keyup', closePopupEscOverLay);
    popup.removeEventListener('click', closePopupEscOverLay);
}


/*Настройки попапа EditProfile*/
function openProfilePopup() {
    profileInputName.value = profileName.textContent;
    profileInputInfo.value = profileInterst.textContent;
    openPopup(profilePopup);
}

// События кнопок открытия/закрытия попапа EditProfile
buttonEdit.addEventListener("click", function () {
    openProfilePopup();
    editProfileValidation.resetForm()
});
profileButtonClose.addEventListener("click", function () {
    closePopup(profilePopup);
});


form.addEventListener("submit", formSubmitHandler);

/*Функция, отрабатывающая при нажатии кнопки сохранить в попапе с редактированием профиля*/
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileInputName.value;
    profileInterst.textContent = profileInputInfo.value;
    closePopup(profilePopup);
}

//Попап Add-image
const imagePopup = document.querySelector(".popup_add-img");
const imageAddPopupButton = document.querySelector(".profile__button-add");
const imageAddButtonClose = imagePopup.querySelector(".popup__close-button");
const imageInputName = imagePopup.querySelector(".form__item-name");
const imageInputUrl = imagePopup.querySelector(".form__link-img");
const imageForm = imagePopup.querySelector(".form");


// События кнопок открытия/закрытия попапа Add-image
imageAddPopupButton.addEventListener("click", function () {
    openPopup(imagePopup);
    addCardValidation.resetForm()
});
imageAddButtonClose.addEventListener("click", function () {
    closePopup(imagePopup);
});
imageForm.addEventListener("submit", addImageHandler);

//Big-screen form
const bigPicPopup = document.querySelector(".popup_big-pic");
const bigPicButtonClose = bigPicPopup.querySelector(".popup__close-button");
const bigImage = bigPicPopup.querySelector("img");
const bigImageName = bigPicPopup.querySelector("h3");
bigPicButtonClose.addEventListener("click", function () {
    closePopup(bigPicPopup);
});

/*Настраиваем попап Big-screen*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.closest('.grid-card').querySelector('.grid-card__text').textContent;

    bigImage.src = image
    bigImageName.textContent = title;

    openPopup(bigPicPopup);
}

/*Закрываем попап Big-screen*/
profileButtonClose.addEventListener("click", function () {
    closePopup(bigPicPopup);
});



/*Создание и добавление карточки на страницу*/
const cardsContainer = document.querySelector(".cards-container");

function addCard(data) {
    /*Создаем объект с данными, третьим параметром передаю функцию обработчик для слушателя событий*/
    const card = new Card(data, '#card-template', openImagePopup);
    const cardNode = card.createCard(); /*Вставляем разметку*/
    cardsContainer.prepend(cardNode); /*Добавляем сформированную карточку в начало страницы*/
}

/*Функция, отрабатывающая при нажатии кнопки создать в попапе с добавлением карточки*/
function addImageHandler(e) {
    e.preventDefault();
    const data = {
        name: imageInputName.value,
        link: imageInputUrl.value
    }
    addCard(data)
    closePopup(imagePopup);
}


// Загружаем стартовые карточки
function init() {
    initialCards.forEach(function (el) {
        addCard(el)
    });
}

init();

            // ВАЛИДАЦИЯ //
/*Выбираем форму и ее элементы для валидации */
const formSelectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, profilePopup);
const addCardValidation = new FormValidator(formSelectors, imagePopup);

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
