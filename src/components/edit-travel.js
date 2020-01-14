import {tripCard, extraOffers, MaxValues, getRandomNumber} from '../mock/card';
import {formatDate, createElement} from "../utils/utils";

const testChecked = (value) => {
  return value ? `checked` : ``;
};

const createExtraTemplate = (offers) => {
  return offers
      .map((offer) => {
        return (
          `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${testChecked(offer.isChecked)}>
                      <label class="event__offer-label" for="event-offer-${offer.type}-1">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>`
        );
      })
      .slice(0, getRandomNumber(0, MaxValues.MAX_EXTRA))
      .join(``);
};

const createEditTemplate = () => {

  const extraOffersList = createExtraTemplate(extraOffers);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${tripCard.type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Sightseeing at
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripCard.city}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(tripCard.startDate)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(tripCard.endDate)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripCard.price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${extraOffersList}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${tripCard.description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    <img class="event__photo" src="${tripCard.img[0]}" alt="Event photo">
                    <img class="event__photo" src="${tripCard.img[1]}" alt="Event photo">
                    <img class="event__photo" src="${tripCard.img[2]}" alt="Event photo">
                    <img class="event__photo" src="${tripCard.img[3]}" alt="Event photo">
                    <img class="event__photo" src="${tripCard.img[4]}" alt="Event photo">
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

export default class EditCard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEditTemplate();
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
