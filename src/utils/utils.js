import {MONTH_SHORT_NAMES} from '../const.js';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const SEC_IN_MIN = 3600;
const MS_IN_SEC = 1000;


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
  return Date.now() + 1 + Math.floor(Math.random() * (DAYS_IN_WEEK * HOURS_IN_DAY * SEC_IN_MIN * MS_IN_SEC));
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

export {getRandomElement, getRandomNumber, getRandomBoolean, getRandomDate, formatDate, formatTextDate, formatTime};
