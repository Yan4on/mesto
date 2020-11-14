import Card from "../components/Card.js"; //импорт стартовых карточек
import FormValidator from "../components/FormValidator.js"; //импорт валидации
import Section from "../components/Section.js"; //импорт валидации
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js"; //импорт класса, отвечающего за попапы с подтверждением
import Api from "../components/Api.js"; 
import "./index.css";
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
const editAvatar = document.querySelector('.popup_edit-avatar');
const btnEditAvatar = document.querySelector('.profile__avatar');
const profilePopup = document.querySelector(".popup_profile");
const buttonEdit = document.querySelector(".profile__button-edit");

//Попап Add-image
const imagePopup = document.querySelector(".popup_add-img");
const imageAddPopupButton = document.querySelector(".profile__button-add");

const errorServer = document.querySelector(".error-server");

// Создаем объект для попапа с картинкой
const popupImage = new PopupWithImage(".popup_big-pic");

// Создаем объект для взаимодействия с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '691998da-b477-4262-8750-23151b55d1d5',
    'Content-Type': 'application/json'
  },
})


// Вывод ошибки запроса к серверу на страницу
function setErrorServer(err) {
  errorServer.textContent = `Ошибка при соединение с сервером: ${err}. Попробуйте повторить позднее`;

  errorServer.classList.add('error-server_active');
  setTimeout(() => {
    errorServer.classList.remove('error-server_active');
  }, 8000)
}

// Создаем объект секции
const cardsList = new Section({
  renderer: (card) => {
    addCardToPage(card);
  }
},
  ".cards-container"
);

// Создаем объект профиля
const userInfo = new UserInfo(".profile__name", ".profile__interst", ".profile__avatar");

// Ждем, когда все промисы выполнятся и после рисуем страницу
Promise.all([
  api.getUserInfoFromServer(), // Получаем данные профиля
  api.getInitialCards() // Получаем массив карточек
])
  .then((values) => {
    const [userData, cards] = values;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => { setErrorServer(err); });


// Создаем объект для попапа Подтверждения
const popupDeleteConfirm = new PopupWithSubmit(
  {
    //Обработчик кнопки Да
    handleSubmit: (card) => {
      api.deleteCardToServer(card)
        .then(() => {
          card.deleteCardToPage();
          popupDeleteConfirm.close();
        })
        .catch((err) => { setErrorServer(err); });
    },
  },
  ".popup_confirm-delete"
);

// Добавление карточки на страницу
function addCardToPage(dataCard) {
  // Создаем объект карточки
  const card = new Card(
    dataCard,
    userInfo.id,
    {
      // Обработчик клика по картинке карточки
      handleClickImage: () => {
        const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки            
        popupImage.setEventListeners();
        popupImage.open(cardInfo);
      },
      // Обработчик клика по кнопке удаления карточки
      handleDeleteClick: () => {
        popupDeleteConfirm.setEventListeners(card);
        popupDeleteConfirm.open();
      },
      // Обработчик клика по лайку карточки
      handleLikeClick: () => {
        // Если владелец лайка я, то делаем его активным
        if (card.haveLikeOwner()) {
          api.likeDownCardToServer(card)
            .then((data) => {
              // Ставим лайк и количество на основании того, что получено с сервера
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => { setErrorServer(err); });
        } else {
          api.likeUpCardToServer(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => { setErrorServer(err); });
        }
      }
    },
    "#card-template"
  );
  const cardNode = card.createCard(); // Вставляем разметку
  cardsList.addItem(cardNode); // Добавляем на страницу
}

// Создаем объект для попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  {
    //Обработчик кнопки Сохранить
    handleSubmit: (inputValues) => {
      popupEditProfile.loadStart();           // Включаем блок и меняем название кнопки
      api.saveUserInfoToServer(inputValues)   // Сохраняем на сервере
        .then((info) => { 
          userInfo.setUserInfo(info);
          popupEditProfile.close();
          editProfileValidation.resetForm(); // Очищаем поля при Создании
         }) // Устанавливаем данные о пользователе на страницу
        .catch((err) => { setErrorServer(err); })
        .finally(() => {
          popupEditProfile.loadEnd();     //Снимаем блок и меняем название кнопки на начальное          
        });
    },
    //Очищаем поля при закрытии
    resetForm: () => {
      editProfileValidation.resetForm();
    },
  },
  ".popup_profile"
);

/*Создаем объект для попапа редактирования Аватара*/
const popupEditAvatar = new PopupWithForm({
  handleSubmit: (inputValues) => {
    popupEditAvatar.loadStart();
    api.saveAvatarToServer(inputValues)
      .then((info) => { 
        userInfo.setUserInfo(info); // Устанавливаем данные о пользователе на страницу
        popupEditAvatar.close();
        editAvatarValidation.resetForm(); // Очищаем поля при Создании }) 
      })
      .catch((err) => { setErrorServer(err); })
      .finally(() => {
        popupEditAvatar.loadEnd();  //Снимаем блок и меняем название кнопки на начальное       
      });
  },
  // Очищаем поля при закрытии
  resetForm: () => {
    editAvatarValidation.resetForm();
  },
},
  ".popup_edit-avatar"
);

// Создаем объект для попапа добавления карточки
const popupAddCard = new PopupWithForm(
  {
    // Обработчик кнопки Создать
    handleSubmit: (inputValues) => {
      popupAddCard.loadStart();
      api.saveCardToServer(inputValues)
        .then((card) => {
          addCardToPage(card); //Добавляем карточку на страницу
          popupAddCard.close();
          addCardValidation.resetForm(); // Очищаем поля при Создании
        })
        .catch((err) => { setErrorServer(err); })
        .finally(() => {
          popupAddCard.loadEnd();  //Снимаем блок и меняем название кнопки на начальное          
        });
    },
    // Очищаем поля при закрытии
    resetForm: () => {
      addCardValidation.resetForm();
    },
  },
  ".popup_add-img"
);



// Добавляем слушатели событий
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

btnEditAvatar.addEventListener("click", () => { popupEditAvatar.open() });
buttonEdit.addEventListener("click", () => {
   const info = userInfo.getUserInfo();
   popupEditProfile.popup.querySelector(".form__contact-name").value = info.name;
   popupEditProfile.popup.querySelector(".form__contact-interst").value = info.interst;
   popupEditProfile.open();
});
imageAddPopupButton.addEventListener("click", () => { popupAddCard.open() 
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
const editAvatarValidation = new FormValidator(formSelectors, editAvatar);
const editProfileValidation = new FormValidator(formSelectors, profilePopup);
const addCardValidation = new FormValidator(formSelectors, imagePopup);

/*включаем валидацию*/
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
