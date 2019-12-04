import {createMenuTemplate} from './components/menu.js'
import {createFilterTemplate} from './components/filter.js'
import {createSortTemplate} from './components/sort.js'
import {createCardTemplate} from './components/card-travel.js'
import {createEditTemplate} from './components/edit-travel.js'
import {createInformationTemplate} from './components/information.js'
import {generateTravelCards} from './mock/card.js'


const TRIP_COUNT = 3;

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

const tripList = tripEvents.querySelector(`.trip-events__list`);

const tripCards = generateTravelCards(TRIP_COUNT);

tripCards.slice().forEach((card) => {
  render(tripList, createCardTemplate(card), `afterbegin`)
});
