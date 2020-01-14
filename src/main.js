import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import CardComponent from './components/card-travel';
import EditCardComponent from './components/edit-travel';
import InformComponent from './components/information';
import CardsListComponent from './components/list';
import {tripCards, getTotalPrice} from './mock/card';
import {render, RenderPosition} from './utils/utils';


const tripInformation = document.querySelector(`.trip-main__trip-info`);

render(tripInformation, new InformComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);

const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);

render(tripControlsTitleOfMenu, new MenuComponent().getElement(), RenderPosition.AFTEREND);

render(tripControlsContainer, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

render(tripEvents, new CardsListComponent().getElement(), RenderPosition.BEFOREEND);

const tripList = tripEvents.querySelector(`.trip-days`);

const renderCard = (card, index) => {
  const cardComponent = new CardComponent(card, index);
  const cardEditComponent = new EditCardComponent();

  const editButtons = cardComponent.getElement().querySelectorAll(`.event__rollup-btn`);
  editButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      tripList.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
    });
  });

  const cardEdit = cardEditComponent.getElement();
  cardEdit.addEventListener(`submit`, () => {
    tripList.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  render(tripList, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

tripCards.slice().sort(
  function(a, b) {
    return a.startDate - b.startDate
  }
).forEach((card, index) => {
  renderCard(card, index);
});

const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);
totalPriceContainer.textContent = getTotalPrice().toString();
