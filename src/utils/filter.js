import {FILTER_TYPE} from '../consts';

const getFutureCards = (cards, today) => {
  return cards.filter((it) => it.startDate > today);
};

const getPastCards = (cards, today) => {
  return cards.filter((it) => it.startDate < today);
};

export const getCardsByFilter = (cards, filterType) => {
  const today = new Date();

  switch (filterType) {
    case FILTER_TYPE.FUTURE:
      return getFutureCards(cards, today);
    case FILTER_TYPE.PAST:
      return getPastCards(cards, today);
    default:
      return cards;
  }
};
