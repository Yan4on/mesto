export default class UserInfo {
  constructor(profileName, profileInterst, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileInterst = document.querySelector(profileInterst);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  //получить данные со страницы
  getUserInfo() {
    const name = this._profileName.textContent;
    const interst = this._profileInterst.textContent;
    return { name, interst };
  }

  //установить данные на страницу
  setUserInfo({ name, interst, avatar, _id }) {
    this.id = _id;
    // Так как при редактировании профиля аватар не ставится, то проверка
    if (avatar) {
      this._profileAvatar.style.backgroundImage = `url("${avatar}")`;
    }

    if (name) {
      this._profileName.textContent = name;
    }

    if (interst) {
      this._profileInterst.textContent = interst;
    }
  }
}
