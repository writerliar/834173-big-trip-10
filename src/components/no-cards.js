import AbstractComponent from './abstract';

const createEmptyListTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class EmptyList extends AbstractComponent {
  getTemplate() {
    return createEmptyListTemplate();
  }
}
