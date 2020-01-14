import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import CardComponent from './components/card-travel';
import EditCardComponent from './components/edit-travel';
import InformComponent from './components/information';
import CardsListComponent from './components/list';
import EmptyList from './components/no-cards';
import {tripCards, getTotalPrice} from './mock/card';
import {render, RenderPosition} from './utils/utils';

const renderCard = (tripList, card, index) => {
  const onEscapePress = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscapeKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscapePress);
    }
  };

  const cardComponent = new CardComponent(card, index);
  const replaceCardToEdit = () => {
    tripList.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  };

  const cardEditComponent = new EditCardComponent();
  const replaceEditToCard = () => {
    tripList.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  };

  const editButtons = cardComponent.getElement().querySelectorAll(`.event__rollup-btn`);
  editButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      replaceCardToEdit();
      document.addEventListener(`keydown`, onEscapePress);
    });
  });

  const cardEdit = cardEditComponent.getElement();
  cardEdit.addEventListener(`submit`, () => {
    replaceEditToCard();
    document.removeEventListener(`keydown`, onEscapePress);
  });

  render(tripList, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);

render(tripControlsTitleOfMenu, new MenuComponent().getElement(), RenderPosition.AFTEREND);
render(tripControlsContainer, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);

if (tripCards.length === 0) {
  render(tripEvents, new EmptyList().getElement(), RenderPosition.BEFOREEND);
} else {
  const tripInformation = document.querySelector(`.trip-main__trip-info`);
  render(tripInformation, new InformComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(tripEvents, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(tripEvents, new CardsListComponent().getElement(), RenderPosition.BEFOREEND);

  const tripList = tripEvents.querySelector(`.trip-days`);

  tripCards.slice().sort(
    function(a, b) {
      return a.startDate - b.startDate
    }
  ).forEach((card, index) => {
    renderCard(tripList, card, index);
  });
}

const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);
totalPriceContainer.textContent = getTotalPrice().toString();
