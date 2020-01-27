import CardComponent from '../components/card-travel';
import EditCardComponent from '../components/edit-travel';
import {render, RenderPosition, replace, remove,} from '../utils/utils';
import {isEscapePress} from '../utils/is-escape-press';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const EmptyCard = {
  type: null,
  city: ``,
  img: [],
  description: ``,
  startDate: `01/01/2019`,
  endDate: `02/01/2019`,
  startTime: `00:00`,
  endTime: `00:00`,
  price: ``,
  extra: null,
  isFavorite: false,
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

  render(card, index, mode) {
    const oldCardComponent = this._CardComponent;
    const oldEditCardComponent = this._EditCardComponent;

    this._CardComponent = new CardComponent(card, index);
    this._EditCardComponent = new EditCardComponent(card, index);

    this._CardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscapePress);
    });

    this._EditCardComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._EditCardComponent.getData();
      this._onDataChange(this, card, Object.assign(card, data));
      this._replaceEditToCard();
    });

    this._EditCardComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, card, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEditCardComponent && oldCardComponent) {
          replace(this._CardComponent, oldCardComponent);
          replace(this._EditCardComponent, oldEditCardComponent);
          this._replaceEditToCard();
        } else {
          render(this._container, this._CardComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEditCardComponent && oldCardComponent) {
          remove(oldCardComponent);
          remove(oldEditCardComponent);
        }
        document.addEventListener(`keydown`, this._onEscapePress);
        render(this._container, this._EditCardComponent, RenderPosition.AFTERBEGIN);
        break;
    }

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

  destroy() {
    remove(this._EditCardComponent);
    remove(this._CardComponent);
    document.removeEventListener(`keydown`, this._onEscapePress);
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
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyCard, null);
      }

      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }
}
