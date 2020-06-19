const moment = require('moment');
const db = require('./index.js');
const Listing = require('./Listing.js');

// :::::Helper Functions:::::

// Random Number Generator
const randomNum = (max, min) => Math.floor((Math.random() * (max - min)) + min);

// Add Padding Function
const padNumber = (targetNum) => {
  targetNum = targetNum + '';
  while (targetNum.length < 3) {
    targetNum = '0' + targetNum;
  }
  return targetNum
}

// Random Date Generator (Returns an array of strings, which are dates of the next three months from today)
function getDatesForThreeMonths() {
  let startDate = new Date();
  let endDate = new Date();
  let thisMonth = startDate.getMonth();
  endDate.setMonth(thisMonth + 3);

  let dateArray = [];
  let availableDates;
  let currentDate = moment(startDate);
  endDate = moment(endDate);
  while (currentDate <= endDate) {
      dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
      currentDate = moment(currentDate).add(1, 'days');
  }
  let availFirst = randomNum(1, 39); // These can be enhanced
  let availLast = randomNum(40, 93);

  availableDates = dateArray.slice(availFirst, availLast);
  return availableDates;
}

const mockDataGenerator = (listing) => {
  let mockData = {};
  mockData.guests = {};

  mockData.listing_id = padNumber(listing);
  mockData.guests.adults = randomNum(1, 3);
  mockData.guests.children = randomNum(0, 3);
  mockData.guests.infants = randomNum(0, 3);
  mockData.guests.total = mockData.guests.adults +
                          mockData.guests.children +
                          mockData.guests.infants;
  mockData.open_dates = getDatesForThreeMonths();
  mockData.price = randomNum(30, 250);
  mockData.review = randomNum(0, 5);

  return mockData;
}

let mockData = [];
for (let i = 0; i < 100; i++) {
  mockData.push(mockDataGenerator(i));
}

const insertSampleData = function(mockData) {
  Listing.create(mockData)
    .then(() => console.log('Seeding Successful, it looks like: ', mockData))
    .catch(err => console.log('Error: Mock data generation failed', err))
};

insertSampleData(mockData);