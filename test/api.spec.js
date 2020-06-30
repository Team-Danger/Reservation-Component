require('babel-polyfill');
const request = require('supertest');
const Listing = require('../database/Listing.js');
const generateMockData = require('../database/seed.js');
const app = require('../server/app.js');

describe('API GET Request Unit Test ', () => {
  it('Should return 200 and response when GET request is made with valid request param of 001', async () => {
    jest.setTimeout(90000);
    const testListingOne = new Listing(await generateMockData('001'));
    Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
      if (listing_id === '001') {
        resolve(testListingOne);
      } else {
        reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
      }
    });
    return request(app).get('/api/001/reservation')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.listing_id).toBe('001');
      });
  });

  it('Should return 200 and response when GET request is made with valid request param of 010', async () => {
    jest.setTimeout(90000);
    const testListingTen = new Listing(await generateMockData('010'));
    Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
      if (listing_id === '010') {
        resolve(testListingTen);
      } else {
        reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
      }
    });
    return request(app).get('/api/010/reservation')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.listing_id).toBe('010');
        expect(res.body).toHaveProperty('listing_id');
        expect(res.body).toHaveProperty('guests');
        expect(res.body).toHaveProperty('open_dates');
        expect(res.body).toHaveProperty('price');
        expect(res.body).toHaveProperty('review');
      });
  });

  it('Should return 200 and response when GET request is made with valid request param of 100', async () => {
    jest.setTimeout(90000);
    const testListingHundred = new Listing(await generateMockData('100'));
    Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
      if (listing_id === '100') {
        resolve(testListingHundred);
      } else {
        reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
      }
    });

    return request(app).get('/api/100/reservation')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(JSON.stringify(testListingHundred));
      });
  });

  it('Should return 500 when invalid GET request with string is made', async () => request(app).get('/api/blueberrySoju/reservation')
    .then((res) => {
      expect(res.statusCode).toBe(500);
    }));

  it('Should return 500 when invalid GET request with number is made', async () => request(app).get('/api/45647891328/reservation')
    .then((res) => {
      expect(res.statusCode).toBe(500);
    }));

  //   expect(responseTen.body).toHaveProperty('listing_id');
  //   expect(responseTen.body).toHaveProperty('guests');
  //   expect(responseTen.body).toHaveProperty('open_dates');
  //   expect(responseTen.body).toHaveProperty('price');
  //   expect(responseTen.body).toHaveProperty('review');

  //   expect(responseHundred.body).toHaveProperty('listing_id');
  //   expect(responseHundred.body).toHaveProperty('guests');
  //   expect(responseHundred.body).toHaveProperty('open_dates');
  //   expect(responseHundred.body).toHaveProperty('price');
  //   expect(responseHundred.body).toHaveProperty('review');
  // });

  // it('Should return response with matching listing ID', async () => {
  //   const responseOne = await request(app).get('/api/001/reservation');
  //   const responseTen = await request(app).get('/api/010/reservation');
  //   const responseHundred = await request(app).get('/api/100/reservation');

  //   expect(responseOne.body.listing_id).toBe('001');
  //   expect(responseTen.body.listing_id).toBe('010');
  //   expect(responseHundred.body.listing_id).toBe('100');
  // });
});
