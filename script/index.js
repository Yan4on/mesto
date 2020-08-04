const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.form__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector ('.profile__name');
const profileInterst = document.querySelector ('.profile__interst');
let form = document.querySelector('.form');
let formContactInfo = document.querySelector('.form__contact-info');
let formWrap = document.querySelector('.form__wrap');
let formName = document.querySelector('.form__contact-name');
let formInterst = document.querySelector('.form__contact-interst');

function openPopup() {
  formName.value = profileName.textContent;
  formInterst.value = profileInterst.textContent;
  popup.classList.add('popup_open');
}


function closePopup() {
    popup.classList.remove('popup_open');
}


buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInterst.textContent = formInterst.value;
  closePopup();
}


form.addEventListener('submit', formSubmitHandler);