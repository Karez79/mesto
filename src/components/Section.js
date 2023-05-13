export class Section {
  constructor({ renderer }, containerId) {
    this._renderer = renderer;
    this._container = document.querySelector(containerId);
  };

  renderElements = (items) => {
    items.forEach(item => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(el) {
    this._container.prepend(this._renderer(el));
  }
}
