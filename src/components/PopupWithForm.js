import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleSubmit, resetForm }, popupSelector) {
    super(popupSelector);
    this._btnSubmit = this.popup.querySelector('.form__submit')
    this._blockAction = document.querySelector('.block-action');
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._resetForm = resetForm;
  }

  //Получаем данные из полей попапа
  _getInputValues() {
    this._inputList = this.popup.querySelectorAll(".form__input");
    this._popupValues = {};
    console.log(this._inputList)
    this._inputList.forEach(
      (input) => {        
        this._popupValues[input.name] = input.value
      }
    );
    console.log(this._popupValues);
    return this._popupValues;
  }

  // UX - подгрузка данных
  loadStart() {
    this._btnSubmit.textContent = "Сохранение...";
    this._blockAction.classList.add("block-action_active"); //ставим блокирующий клики слой
  }

  loadEnd() {
    if (this.popup.classList.contains("popup_add-img")) {
      this._btnSubmit.textContent = "Создать";
    } else {
      this._btnSubmit.textContent = "Сохранить";
    }
    this._blockAction.classList.remove("block-action_active"); //снимаем блокирующий клики слой
  }

  //Закрываем попап
  close() {
    super.close();
    this._resetForm(); //очищаем поля
  }

  setEventListeners() {
    super.setEventListeners();
    //навешиваем обработчик кнопки Сохранить/Создать
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}