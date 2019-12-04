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

const Dates = [
  `18/03/19`,
  `18/04/19`,
  `18/05/19`,
  `18/06/19`
];

const Times = [
  `00:00`,
  `10:00`,
  `12:00`,
  `15:00`
];

const Prices = [
  `100`,
  `1000`,
  `1200`,
  `1500`
];

const ExtraTypes = [
  `Add luggage`,
  `Switch to comfort`,
  `Add meal`,
  `Choose seats`,
];

const ExtraPrices = [
  `10`,
  `9`,
  `150`,
  `2`
];

const gerRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomDescription = () => {
  let newDescription = [];

  for (let i = 0; i < getRandomNumber(1, 3); i++) {
    newDescription.push(getRandomElement(travelDescription));
  }

  return newDescription.join(` `);
};

const generateTravelCard = () => {
  return {
    type: getRandomElement(Types),
    city: getRandomElement(Cities),
    img: gerRandomPhoto(),
    description: randomDescription(),
    date: getRandomElement(Dates),
    time: getRandomElement(Times),
    price: getRandomElement(Prices),
    extraType: getRandomElement(ExtraTypes),
    extraPrice: getRandomElement(ExtraPrices)
  };
};

const generateTravelCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTravelCard);
};

export {generateTravelCard, generateTravelCards};
