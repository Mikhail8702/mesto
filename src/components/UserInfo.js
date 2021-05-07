export default class UserInfo {
  constructor(nameSelector, subSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(subSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return{
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    };
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userInfo.textContent = item.about;
    this._userAvatar.style.backgroundImage = `url(${item.avatar})`;
  }
}
