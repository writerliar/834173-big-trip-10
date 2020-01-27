import {tripCards} from "../mock/card";
import EmptyList from "../components/no-cards";
import InformComponent from "../components/information";
import SortComponent, {SortType} from "../components/sort";
import CardsListComponent from "../components/list";
// import {getCardsByFilter} from '../utils/filter';
import {render, remove, RenderPosition} from '../utils/utils';
import PointControllerComponent from "./point-controller";

const renderCards = (tripList, cards, onDataChange, onViewChange) => {
  return cards.map((card, index) => {
    const cardController = new PointControllerComponent(tripList, onDataChange, onViewChange);
    cardController.render(card, index);

    return cardController;
  });
};

export default class TripController {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._tripControllers = [];

    this._EmptyList = new EmptyList();
    this._InformComponent = new InformComponent();
    this._SortComponent = new SortComponent();
    this._CardsListComponent = new CardsListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._SortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._cardsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const cards = this._cardsModel.getCards();

    if (tripCards.length === 0) {
      render(container, this._EmptyList.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    const tripInformation = document.querySelector(`.trip-main__trip-info`);
    render(tripInformation, this._InformComponent.getElement(), RenderPosition.AFTERBEGIN);

    render(container, this._SortComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(container, this._CardsListComponent.getElement(), RenderPosition.BEFOREEND);

    const tripList = this._CardsListComponent.getElement();

    const newCards = renderCards(tripList, cards.slice().sort((a, b) => a.startDate - b.startDate), this._onDataChange, this._onViewChange);

    this._tripControllers = this._tripControllers.concat(newCards);
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._cardsModel.updateCard(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _onViewChange() {
    this._tripControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {

    const cards = this._cardsModel.getCards();
    let sortedCards = [];

    switch (sortType) {
      case SortType.TIME:
        sortedCards = cards.slice().sort((a, b) => b.startDate - a.startDate);
        break;
      case SortType.PRICE:
        sortedCards = cards.slice().sort((a, b) => b.price - a.price);
        break;
      default:
        sortedCards = cards;
        break;
    }

    const tripList = this._CardsListComponent.getElement();

    tripList.innerHTML = ``;

    this._tripControllers = renderCards(tripList, sortedCards, this._onDataChange, this._onViewChange);
  }

  _onFilterChange() {

    const tripList = this._CardsListComponent.getElement();

    tripList.innerHTML = ``;

    this._tripControllers = renderCards(tripList, this._cardsModel.getCards(), this._onDataChange, this._onViewChange);
  }
}
