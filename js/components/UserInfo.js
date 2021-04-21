export class UserInfo {
  constructor({nameProf, jobDiscr}) {
    this._userName = nameProf;
    this._userInfo = jobDiscr;
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
