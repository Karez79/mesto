export class UserInfo {
  constructor({nameId, aboutId, avatarId}) {
    this._name = document.querySelector(nameId);
    this._about = document.querySelector(aboutId);
    this._avatar = document.querySelector(avatarId);
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      userId: this._userId
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo = (name, about, avatar, userId) => {
    this._name.textContent = name;
    this._about.textContent = about;
    this.setAvatar(avatar);
    this._userId = userId;
  }

  setAvatar = (avatar) => {
    this._avatar.src = avatar;
  }
}
