export default class Section {
    
    constructor({ renderer }, cardsContainer) {
      this._renderer = renderer;
      this._container = document.querySelector(cardsContainer);
    }
  
    renderItems(cards) {
      cards.forEach((card) => { this._renderer(card) });
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  }