export default class Card {

    constructor(data, cardTemplate, createImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._createImagePopup = createImagePopup;
    }

    _getTemplate() {
        this._card = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.grid-card')
            .cloneNode(true);
    }


    /*Обработчик событий. Лайк*/
    _addHandlerLike(like) {
        like.classList.toggle('grid-card__like_active');
    }

    /*Обработчик событий. Удаляет карточку*/
    _addHandlerBtnRemove() {
        this._card.remove();
        this._card = null;
    }

    /*Установка слушателей*/
    _setEventListeners() {
        const like = this._card.querySelector('.grid-card__like');
        const btnRemove = this._card.querySelector('.grid-card__del');
        const image = this._card.querySelector('.grid-card__img');

        like.addEventListener('click', () => { this._addHandlerLike(like); });
        btnRemove.addEventListener('click', () => { this._addHandlerBtnRemove(); });
        image.addEventListener('click', this._createImagePopup);
    }

    /*Создаем карточку*/
    createCard() {
        this._getTemplate();

        const elementImage = this._card.querySelector('.grid-card__img');
        const elementTitle = this._card.querySelector('.grid-card__text');

        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementTitle.textContent = this._name;

        this._setEventListeners();

        return this._card;
    }

}