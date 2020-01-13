import {formatTime, formatTextDate, createElement} from '../utils/utils';

const createCardTemplate = (card, index) => {
  return (
    `<li class="trip-days__item  day">
         <div class="day__info">
         <span class="day__counter">${index + 1}</span>
         <time class="day__date" datetime="2019-03-18">${formatTextDate(card.startDate)}</time>
         </div>
         <ul class="trip-events__list">
         <li class="trip-events__item">
             <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${card.type}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${card.type} to airport</h3>
                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${formatTime(card.startTime)}</time>
                        &mdash;
                        <time class="event__end-time" datetime="2019-03-18T11:00">${formatTime(card.endTime)}</time>
                      </p>
                      <p class="event__duration">1H 30M</p>
                    </div>
                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${card.price}</span>
                    </p>
                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      <li class="event__offer">
                        <span class="event__offer-title">Order Uber</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">20</span>
                       </li>
                    </ul>
                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>
                </ul>
                </li>`
  );
};

export default class Card {
  constructor(card, index) {
    this._card = card;
    this._index = index;

    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._card, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
