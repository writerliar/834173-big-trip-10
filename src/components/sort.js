import AbstractComponent from './abstract';

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

const createSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day"></span>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
              <label data-sort-type="${SortType.EVENT}" class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label data-sort-type="${SortType.TIME}" class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
                Time
              </label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label data-sort-type="${SortType.PRICE}" class="trip-sort__btn" for="sort-price">
                Price
              </label>
            </div>

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`trip-sort__btn`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getElement().querySelector(`#sort-${this._currentSortType}`).removeAttribute(`checked`);
      this.getElement().querySelector(`#sort-${sortType}`).setAttribute(`checked`, `checked`);

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
