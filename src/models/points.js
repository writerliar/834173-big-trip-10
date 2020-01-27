import {getCardsByFilter} from '../utils/filter';
import {FILTER_TYPE} from '../consts';

export default class CardsModel {
  constructor() {
    this._cards = [];

    this._activeFilterType = FILTER_TYPE.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getCards() {
    return getCardsByFilter(this._cards, this._activeFilterType);
  }

  getCardsAll() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  setFilters(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));

    return true;
  }

  addCards(card) {
    this._cards = [].concat(card, this._cards);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
