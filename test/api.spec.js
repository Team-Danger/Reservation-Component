require('babel-polyfill');
const request = require('supertest');
const Listing = require('../database/Listing.js');
const generateMockData = require('../database/seed.js');
const app = require('../server/app.js');


test('api should respond with the right data', async () => {
  jest.setTimeout(90000);
  // expect.assertions(3);
  const testId = '001';
  const testListing = new Listing(await generateMockData(testId));
  Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
    if (listing_id === testId) {
      resolve(testListing);
    } else {
      reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
    }
  });
  const req = request(app);
  const promises = [
    req.get('/api/001/reservation')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(JSON.stringify(testListing));
      }),
    req.get('/api/hackreactor12345678910/reservation')
      .then((res) => {
        expect(res.statusCode).toBe(500);
      }),
  ];
  return Promise.all(promises);
});
