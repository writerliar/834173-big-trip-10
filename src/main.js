import MenuComponent from './components/menu';
import FilterController from './controllers/filter-controller';
import TripControllerComponent from './controllers/trip-controller';
import CardsModel from './models/points';
import {tripCards, getTotalPrice} from './mock/card';
import {render, RenderPosition} from './utils/utils';

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);
const tripEvents = document.querySelector(`.trip-events`);
const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);

const cardsModel = new CardsModel();
cardsModel.setCards(tripCards);
const tripController = new TripControllerComponent(tripEvents, cardsModel);

const filterController = new FilterController(tripControlsContainer, cardsModel);
filterController.render();

render(tripControlsTitleOfMenu, new MenuComponent().getElement(), RenderPosition.AFTEREND);

tripController.render();

totalPriceContainer.textContent = getTotalPrice().toString();

