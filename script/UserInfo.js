export default class UserInfo {
  
  constructor(profileName, profileInterst) {
    this._profileName = document.querySelector(profileName);
    this._profileWork = document.querySelector(profileInterst);
  }

  //получить данные со страницы
  getUserInfo() {
    const name = this._profileName.textContent;
    const interst = this._profileInterst.textContent;
    return { name, interst };
  }

  //установить данные на страницу
  setUserInfo({ name, about }) {
    if (name) {
      this._profileName.textContent = name;
    }

    if (about) {
      this._profileInterst.textContent = about;
    }
  }
}
  
