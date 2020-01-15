import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import TripControllerComponent from './controllers/trip-controller';
import {tripCards, getTotalPrice} from './mock/card';
import {render, RenderPosition} from './utils/utils';

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);

render(tripControlsTitleOfMenu, new MenuComponent().getElement(), RenderPosition.AFTEREND);
render(tripControlsContainer, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);

const tripController = new TripControllerComponent(tripEvents);

tripController.render(tripCards);

const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);
totalPriceContainer.textContent = getTotalPrice().toString();
