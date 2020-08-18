window.onload = function () {
  const cardsContainer = document.querySelector(".grid-card");
  const initialCards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  //profile form
  const profilePopup = document.querySelector(".popup");
  const buttonEdit = document.querySelector(".profile__button-edit");
  const profileButtonClose = profilePopup.querySelector(".form__close-button");
  const profileInputName = profilePopup.querySelector(".form__contact-name");
  const profileInputInfo = profilePopup.querySelector(".form__contact-interst");
  const profileButtonSave = profilePopup.querySelector(".form__submit");
  const profileName = document.querySelector(".profile__name");
  const profileInterst = document.querySelector(".profile__interst");
  const form = document.querySelector(".form");
  buttonEdit.addEventListener("click", function () {
    openPopup("profile");
  });
  profileButtonClose.addEventListener("click", function () {
    closePopup("profile");
  });
  const formContactInfo = document.querySelector(".form__contact-info");
  let formName = document.querySelector(".form__contact-name");
  let formInterst = document.querySelector(".form__contact-interst");
  form.addEventListener("submit", formSubmitHandler);

  //image form
  const imagePopup = document.querySelector(".popup__add-img");
  const imageAddPopupButton = document.querySelector(".profile__button-add");
  const imageAddButtonClose = imagePopup.querySelector(".form__close-button");
  const imageInputName = imagePopup.querySelector(".form__item-name");
  const imageInputUrl = imagePopup.querySelector(".form__link-img");
  const imageAddButton = imagePopup.querySelector(".form__submit");
  const imageForm = imagePopup.querySelector(".form");
  imageAddPopupButton.addEventListener("click", function () {
    openPopup("imageAdd");
  });
  imageAddButtonClose.addEventListener("click", function () {
    closePopup("imageAdd");
  });
  imageForm.addEventListener("submit", addImageHandler);

  //big-screen form
  const bigPicPopup = document.querySelector(".popup__big-pic");
  const bigPicButtonClose = bigPicPopup.querySelector(".form__close-button");
  const bigImage = bigPicPopup.querySelector("img");
  const bigImageName = bigPicPopup.querySelector("h3");
  bigPicButtonClose.addEventListener("click", function () {
    closePopup("big-pic");
  });



  function openPopup(type) {
    if (type == "profile") {
      formName.value = profileName.textContent;
      formInterst.value = profileInterst.textContent;
      profilePopup.classList.add("popup_open");
    } else if (type == "imageAdd") {
      imageInputName.value = "";
      imageInputUrl.value = "";
      imagePopup.classList.add("popup_open");
    } else if (type == "big-pic") {
      bigPicPopup.classList.add("popup_open");
    }
  }

  function closePopup(type) {
    if (type == "profile") {
      profilePopup.classList.remove("popup_open");
    } else if (type == "imageAdd") {
      imagePopup.classList.remove("popup_open");
    } else if (type == "big-pic") {
      bigPicPopup.classList.remove("popup_open");
    }
  }

  function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileInterst.textContent = formInterst.value;
    closePopup("profile");
  }

  function addImageHandler(e) {
    e.preventDefault();
    const name = imageInputName.value;
    const url = imageInputUrl.value;
    if (name && url) {
      const li = addNewCard(name, url);
      cardsContainer.appendChild(li);
    }
    closePopup("imageAdd");
  }

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
      openPopup("big-pic");
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
