export default class UserInfo {
    constructor(authorElement, jobElement, avatarElement) {
        this._authorElement = authorElement;
        this._jobElement = jobElement;
        this._avatarElement = avatarElement;
    }

    getUserInfo() {
        this._userValues = {};
        this._userValues["nameInput"] = this._authorElement.textContent;
        this._userValues["infInput"] = this._jobElement.textContent;
        return this._userValues;
    }

    setUserInfo(data) {
        this._authorElement.textContent = data.name;
        this._jobElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
    }
}