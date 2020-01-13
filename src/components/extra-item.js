import {createElement} from "../utils/utils";

const testChecked = (value) => {
  return value ? `checked` : ``;
};

const createExtraTemplate = (extraOffer) => {
  return (
    ` <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${testChecked(extraOffer.isChecked)}>
                    <label class="event__offer-label" for="event-offer-luggage-1">
                      <span class="event__offer-title">${extraOffer.title}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${extraOffer.price}</span>
                    </label>
                  </div>`
  );
};

export default class Extra {
  constructor(extraOffer) {
    this._extraOffer = extraOffer;

    this._element = null;
  }

  getTemplate() {
    return createExtraTemplate(this._extraOffer);
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
};
