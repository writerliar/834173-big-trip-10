import {MONTH_SHORT_NAMES} from '../consts';

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

const formatDate = (date) => {
  const formattingDate = new Date(date);

  const day = formattingDate.getDate();
  const month = formattingDate.getMonth();
  const year = formattingDate.getFullYear();

  return `${day}/${month + 1}/${year}`;
};

const formatTextDate = (date) => {
  const textdate = new Date(date);

  const day = textdate.getDate();
  const month = textdate.getMonth();

  return `${MONTH_SHORT_NAMES[month]} ${day}`;
};

const formatTime = (date) => {
  const formattingTime = new Date(date);

  const hours = formattingTime.getHours();
  const minutes = formattingTime.getMinutes();

  return `${hours}:${minutes}`;
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

export {getRandomElement, getRandomNumber, getRandomBoolean, getRandomDate, formatDate, formatTextDate, formatTime, render, RenderPosition, createElement};
