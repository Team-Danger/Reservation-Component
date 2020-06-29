const request = require('supertest');
const _ = require('lodash');
require('regenerator-runtime'); // polyfill is depricated, use regenerator-runtime

const Listing = require('../database/Listing.js');
const app = require('../server/app.js');
const generateMockData = require('../database/seed.js');

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
  const responseOne = await request(app).get('/api/001');
  expect(responseOne.status).toBe(200);
});