import MenuComponent from './components/menu';
import FilterComponent from './components/filter'
import SortComponent from './components/sort'
import CardComponent from './components/card-travel'
import EditCardComponent from './components/edit-travel'
import InformComponent from './components/information'
import ExtraComponent from './components/extra-item'
import CardsListComponent from './components/list'
import {tripCards, extraOffers, MAX_EXTRA, getRandomNumber, getTotalPrice} from './mock/card'
import {render, RenderPosition} from './utils/utils';


const tripInformation = document.querySelector(`.trip-main__trip-info`);

render(tripInformation, new InformComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);

const tripControlsTitleOfMenu = tripControlsContainer.querySelector(`.trip-main__trip-controls .visually-hidden:first-child`);

render(tripControlsTitleOfMenu, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);
// console.log(new MenuComponent().getElement())

render(tripControlsContainer, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
// console.log(new FilterComponent().getElement())

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
// console.log(new SortComponent().getElement())

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
  cardEdit.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    tripList.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  render(tripList, cardComponent.getElement(), RenderPosition.BEFOREEND)
};

tripCards.slice().sort(
  function(a, b){
    return a.startDate-b.startDate
  }
).forEach((card, index) => {
  renderCard(card, index);
});

// const extraList = document.querySelector('.event__available-offers');
//
// extraOffers.slice(0, getRandomNumber(0, MAX_EXTRA))
//   .forEach((extraOffer) => {
//   render(extraList, new ExtraComponent(extraOffer).getElement(), RenderPosition.BEFOREEND);
//   // console.log(new ExtraComponent(extraOffer).getElement())
// });

const totalPriceContainer = document.querySelector(`.trip-info__cost-value`);
totalPriceContainer.textContent = getTotalPrice().toString();
