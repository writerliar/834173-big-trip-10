import {getRandomElement, getRandomNumber, getRandomDate, getRandomBoolean} from '../utils/utils';

const MaxValues = {
  MAX_PRICE: 2000,
  MAX_PICTURE: 5,
  MAX_EXTRA: 2,
  TRIP_COUNT: 3,
};

const Types = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`
];

const Cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Geneva`,
  `Amsterdam`
];

const travelDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const extraOffers = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 10,
    isChecked: getRandomBoolean()
  },
  {
    type: `comfort`,
    title: `Switch to comfort`,
    price: 9,
    isChecked: getRandomBoolean()
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 150,
    isChecked: getRandomBoolean()
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 2,
    isChecked: getRandomBoolean()
  }
];

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const fillPhotos = (count) => {
  return new Array(count)
    .fill(``)
    .map(getRandomPhoto);
};

const randomDescription = () => {
  let newDescription = [];

  for (let i = 0; i < getRandomNumber(1, 3); i++) {
    newDescription.push(getRandomElement(travelDescription));
  }

  return newDescription.join(` `);
};

const generateTravelCard = () => {
  let firstValue = getRandomDate();
  let secondValue = getRandomDate();

  return {
    type: getRandomElement(Types),
    city: getRandomElement(Cities),
    img: fillPhotos(MaxValues.MAX_PICTURE),
    description: randomDescription(),
    startDate: Math.min(firstValue, secondValue),
    endDate: Math.max(firstValue, secondValue),
    startTime: Math.min(firstValue, secondValue),
    endTime: Math.max(firstValue, secondValue),
    price: getRandomNumber(0, MaxValues.MAX_PRICE),
    extra: extraOffers
  };
};

const generateTravelCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTravelCard);
};

const tripCard = generateTravelCard();

const tripCards = generateTravelCards(MaxValues.TRIP_COUNT);

const getTotalPrice = () => {
  let totalPrice = 0;
  for (let i = 0; i < tripCards.length; i++) {
    let card = tripCards[i];

    totalPrice = totalPrice + card.price;
  }

  return totalPrice;
};

export {generateTravelCard, generateTravelCards, fillPhotos, tripCard, tripCards, extraOffers, MaxValues, getTotalPrice, getRandomNumber};
