import AbstractComponent from './abstract';

const createInformationTemplate = () => {
  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
     </div>`
  );
};

export default class Inform extends AbstractComponent {
  getTemplate() {
    return createInformationTemplate();
  }
}
