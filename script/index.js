window.onload = function () {

  //profile form
  const profilePopup = document.querySelector(".popup_profile");
  const buttonEdit = document.querySelector(".profile__button-edit");
  const profileButtonClose = profilePopup.querySelector(".popup__close-button");
  const profileInputName = profilePopup.querySelector(".form__contact-name");
  const profileInputInfo = profilePopup.querySelector(".form__contact-interst");
  const profileName = document.querySelector(".profile__name");
  const profileInterst = document.querySelector(".profile__interst");
  const form = document.querySelector(".form");

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
  buttonEdit.addEventListener("click", function () {
    openProfilePopup();
  });
  profileButtonClose.addEventListener("click", function () {
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
  imageAddPopupButton.addEventListener("click", function () {
    imageAddPopup();
  });
  imageAddButtonClose.addEventListener("click", function () {
    closePopup(imagePopup);
  });
  imageForm.addEventListener("submit", addImageHandler);

  //big-screen form
  const bigPicPopup = document.querySelector(".popup_big-pic");
  const bigPicButtonClose = bigPicPopup.querySelector(".popup__close-button");
  const bigImage = bigPicPopup.querySelector("img");
  const bigImageName = bigPicPopup.querySelector("h3");
  bigPicButtonClose.addEventListener("click", function () {
    closePopup(bigPicPopup);
  });

  /*Настраиваем попап Big-pic*/

  profileButtonClose.addEventListener("click", function () {
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
      const li = addNewCard(name, url);
      cardsContainer.appendChild(li);
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
  function addNewCard(name, url) {
    const li = document.createElement("li");
    li.className = "grid-card__item";
    const removeCard = document.createElement("button");
    removeCard.addEventListener("click", function () {
      li.remove();
    });
    removeCard.className = "grid-card__del";
    removeCard.type = "button";
    const img = document.createElement("img");
    img.src = url;
    img.className = "grid-card__img";
    img.alt = "Изображение карточки";
    img.addEventListener("click", function () {
      bigImage.src = url;
      bigImageName.textContent = name;
      openPopup(bigPicPopup);
    });
    const panel = document.createElement("div");
    panel.className = "grid-card__wrapper";
    const h3 = document.createElement("h3");
    h3.className = "grid-card__text";
    h3.textContent = name;
    const likebtn = document.createElement("button");
    likebtn.className = "grid-card__like";
    likebtn.addEventListener("click", function () {
      likebtn.classList.toggle("grid-card__like_active");
    });
    li.appendChild(removeCard);
    li.appendChild(img);
    panel.appendChild(h3);
    panel.appendChild(likebtn);
    li.appendChild(panel);
    return li;
  }

  function init() {
    initialCards.forEach(function (el) {
      const li = addNewCard(el.name, el.link);
      cardsContainer.append(li);
    });
  }

  init();
};
