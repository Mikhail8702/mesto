export class UserInfo {
  constructor(nameSelector, subSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(subSelector);
  }

  getUserInfo() {
    return{
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    };
  }

  setUserInfo(item) {
    this._userName.textContent = item['profile-input-name'];
    this._userInfo.textContent = item['job-input-name'];
  }
}
