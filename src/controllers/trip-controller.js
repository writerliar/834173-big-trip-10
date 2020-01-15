import CardComponent from '../components/card-travel';
import EditCardComponent from '../components/edit-travel';
import {tripCards} from "../mock/card";
import EmptyList from "../components/no-cards";
import InformComponent from "../components/information";
import SortComponent from "../components/sort";
import CardsListComponent from "../components/list";
import {render, RenderPosition} from '../utils/utils';
import {isEscapePress} from '../utils/is-escape-press';

export default class TripController {
  constructor(container) {
    this._container = container;
    this._EmptyList = new EmptyList();
    this._InformComponent = new InformComponent();
    this._SortComponent = new SortComponent();
    this._CardsListComponent = new CardsListComponent();
  }

  render(cards) {
    const container = this._container;

    const renderCard = (tripList, card, index) => {
      const onEscapePress = () => {
        if (isEscapePress) {
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

      cardComponent.setEditButtonClickHandler(() => {
        replaceCardToEdit();
        document.addEventListener(`keydown`, onEscapePress);
      });

      cardEditComponent.setFormSubmitHandler(() => {
        replaceEditToCard();
        document.removeEventListener(`keydown`, onEscapePress);
      });

      render(tripList, cardComponent.getElement(), RenderPosition.BEFOREEND);
    };

    if (tripCards.length === 0) {
      render(container, this._EmptyList.getElement(), RenderPosition.BEFOREEND);
    } else {
      const tripInformation = document.querySelector(`.trip-main__trip-info`);
      render(tripInformation, this._InformComponent.getElement(), RenderPosition.AFTERBEGIN);
      render(container, this._SortComponent.getElement(), RenderPosition.AFTERBEGIN);
      render(container, this._CardsListComponent.getElement(), RenderPosition.BEFOREEND);

      const tripList = container.querySelector(`.trip-days`);

      cards.slice().sort((a, b) => a.startDate - b.startDate)
        .forEach((card, index) => {
          renderCard(tripList, card, index);
        });
    }
  }
}
