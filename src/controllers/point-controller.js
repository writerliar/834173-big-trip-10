import CardComponent from '../components/card-travel';
import EditCardComponent from '../components/edit-travel';
import {render, RenderPosition, replace} from '../utils/utils';
import {isEscapePress} from '../utils/is-escape-press';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._CardComponent = null;
    this._EditCardComponent = null;

    this._onEscapePress = this._onEscapePress.bind(this);
    this._replaceEditToCard.bind(this);
  }

  render(card, index) {
    const oldCardComponent = this._CardComponent;
    const oldEditCardComponent = this._EditCardComponent;

    this._CardComponent = new CardComponent(card, index);
    this._EditCardComponent = new EditCardComponent(card);

    this._CardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscapePress);
    });

    this._EditCardComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._EditCardComponent.getData();
      this._onDataChange(this, card, Object.assign({}, card, data));
      this._replaceEditToCard();
    });

    this._EditCardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    });

    if (oldCardComponent && oldEditCardComponent) {
      replace(this._CardComponent, oldCardComponent);
      replace(this._EditCardComponent, oldEditCardComponent);
    } else {
      render(this._container, this._CardComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replace(this._EditCardComponent, this._CardComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToCard() {
    document.removeEventListener(`keydown`, this._onEscapePress);

    this._EditCardComponent.reset();
    replace(this._CardComponent, this._EditCardComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscapePress(evt) {
    if (isEscapePress(evt)) {
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }
}
