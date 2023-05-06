export class Section {
  constructor({ items, renderer }, containerId) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerId);
  };

  renderElements() {
    this._items.forEach(item => {
      this._container.prepend(this._renderer(item));
    });
  }

  addItem(el) {
    this._container.prepend(this._renderer(el));
  }
}
