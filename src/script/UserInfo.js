export default class UserInfo {
    constructor(profileName, profileInterst) {
        this._profileName = document.querySelector(profileName);
        this._profileInterst = document.querySelector(profileInterst);
    }

    //получить данные со страницы
    getUserInfo() {
        const name = this._profileName.textContent;
        const interst = this._profileInterst.textContent;
        return { name, interst };
    }

    //установить данные на страницу
    setUserInfo({ name, interst }) {
        this._profileName.textContent = name;
        this._profileInterst.textContent = interst;
    }
}
