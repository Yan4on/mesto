
//profile form
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
    popup.classList.add('popup_open');
    addPopupCloseHandler(popup); /*закрываем клавишей esc и клик по оверлей */
}

/*Закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_open');
    removePopupHandler(popup); /*удаляем обработчик клавиши esc и клик по оверлей */
}

/*Настройки попапа EditProfile*/
function openProfilePopup() {
    formName.value = profileName.textContent;
    formInterst.value = profileInterst.textContent;
    openPopup(profilePopup);
}

// События кнопок открытия/закрытия попапа Profile
buttonEdit.addEventListener("click", function() {
    openProfilePopup();
});
profileButtonClose.addEventListener("click", function() {
    closePopup(profilePopup);
});

const formName = profileInputName;
const formInterst = profileInputInfo;
form.addEventListener("submit", formSubmitHandler);

//Add-image
const imagePopup = document.querySelector(".popup_add-img");
const imageAddPopupButton = document.querySelector(".profile__button-add");
const imageAddButtonClose = imagePopup.querySelector(".popup__close-button");
const imageInputName = imagePopup.querySelector(".form__item-name");
const imageInputUrl = imagePopup.querySelector(".form__link-img");
const imageForm = imagePopup.querySelector(".form");

/*Настрайки попапа add-image*/
function imageAddPopup() {
    imageInputName.value = "";
    imageInputUrl.value = "";
    openPopup(imagePopup);
}

// События кнопок открытия/закрытия попапа add-image
imageAddPopupButton.addEventListener("click", function() {
    imageAddPopup();
});
imageAddButtonClose.addEventListener("click", function() {
    closePopup(imagePopup);
});
imageForm.addEventListener("submit", addImageHandler);

//big-screen form
const bigPicPopup = document.querySelector(".popup_big-pic");
const bigPicButtonClose = bigPicPopup.querySelector(".popup__close-button");
const bigImage = bigPicPopup.querySelector("img");
const bigImageName = bigPicPopup.querySelector("h3");
bigPicButtonClose.addEventListener("click", function() {
    closePopup(bigPicPopup);
});

/*Настраиваем попап Big-pic*/

profileButtonClose.addEventListener("click", function() {
    closePopup(bigPicPopup);
});


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileInterst.textContent = formInterst.value;
    closePopup(profilePopup);
}

function addImageHandler(e) {
    e.preventDefault();
    const name = imageInputName.value;
    const url = imageInputUrl.value;
    if (name && url) {
        const card = getNewCard(name, url);
        cardsContainer.appendChild(card);
    }
    closePopup(imagePopup);
}

/*Функция, закрывающая попап по Escape или при клике по оверлею*/
function closePopupEscOverLay(evt) {
    const popupOpened = document.querySelector('.popup_open');

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


// Добавление карточки и ее настройка
const cardsContainer = document.querySelector(".cards-container");

function getNewCard(name, url) {
    const temp = document.getElementsByTagName("template")[0];
    const clon = temp.content.cloneNode(true);
    const removeCard = clon.querySelector(".grid-card__del");
    removeCard.addEventListener("click", function() {
      removeCard.parentNode.remove()        
    });
    const img = clon.querySelector(".grid-card__img");
    img.src = url;
    img.addEventListener("click", function() {
        bigImage.src = url;
        bigImageName.textContent = name;
        openPopup(bigPicPopup);
    });
    const h3 = clon.querySelector(".grid-card__text");
    h3.textContent = name;
    const likebtn = clon.querySelector(".grid-card__like");
    likebtn.addEventListener("click", function() {
        likebtn.classList.toggle("grid-card__like_active");
    });

    return clon;
}

function init() {
    initialCards.forEach(function(el) {
        const card = getNewCard(el.name, el.link);
        cardsContainer.append(card);
    });
}

init();