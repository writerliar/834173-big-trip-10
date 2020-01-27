const TimesValues = {
  DAYS_IN_WEEK: 7,
  HOURS_IN_DAY: 24,
  SEC_IN_MIN: 3600,
  MS_IN_SEC: 1000
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * (TimesValues.DAYS_IN_WEEK * TimesValues.HOURS_IN_DAY * TimesValues.SEC_IN_MIN * TimesValues.MS_IN_SEC));
};

const render = (container, template, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(template);
      break;
    case RenderPosition.AFTEREND:
      container.after(template);
      break;
    case RenderPosition.BEFOREEND:
      container.append(template);
      break;
    default:
      container.append(template);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const testChecked = (value) => {
  return value ? `checked` : ``;
};

export {getRandomElement, getRandomNumber, getRandomBoolean, getRandomDate, render, RenderPosition, createElement, replace, remove, testChecked};
