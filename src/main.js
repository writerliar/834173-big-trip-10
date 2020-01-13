import {createMenuTemplate} from './components/menu'
import {createFilterTemplate} from './components/filter'
import {createSortTemplate} from './components/sort'
import {createCardTemplate} from './components/card-travel'
import {createEditTemplate} from './components/edit-travel'
import {createInformationTemplate} from './components/information'
import {createExtraTemplate} from './components/extra-item'
import {tripCards, extraOffers, MAX_EXTRA, getRandomNumber, getTotalPrice} from './mock/card'

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInformation = document.querySelector(`.trip-main__trip-info`);

render(tripInformation, createInformationTemplate(), `afterbegin`);

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);

const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);

render(tripControlsTitleOfMenu, createMenuTemplate(), `afterend`);

render(tripControlsContainer, createFilterTemplate(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, createSortTemplate(), `beforeend`);

const tripSort = tripEvents.querySelector(`.trip-events__trip-sort`);

render(tripSort, createEditTemplate(), `afterend`);

const tripList = tripEvents.querySelector(`.trip-days`);

tripCards.slice().sort(
  function(a, b){
    return a.startDate-b.startDate
  }
).forEach((card, index) => {
  render(tripList, createCardTemplate(card, index), `beforeend`)
});

const extraList = document.querySelector('.event__available-offers');

extraOffers.slice(0, getRandomNumber(0, MAX_EXTRA)).forEach((extraOffer) => {
  render(extraList, createExtraTemplate(extraOffer), `beforeend`);
});

const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);
totalPriceContainer.textContent = getTotalPrice().toString();
