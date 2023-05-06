export class UserInfo {
  constructor({titleId, subtitleId}) {
    this._titleId = document.querySelector(titleId);
    this._subtitleId = document.querySelector(subtitleId);
  };

  getUserInfo() {
    return {
      title: this._titleId.value,
      subtitle: this._subtitleId.value,
    };
  }

  setUserInfo(title, subtitle) {
    this._titleId.value = title;
    this._subtitleId.value = subtitle;
  }
}
