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
    return request(app).get('/api/reservation/001')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.listing_id).toBe('001');
        expect(res.body).toHaveProperty('listing_id');
        expect(res.body).toHaveProperty('guests');
        expect(res.body).toHaveProperty('open_dates');
        expect(res.body).toHaveProperty('price');
        expect(res.body).toHaveProperty('review');
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
    return request(app).get('/api/reservation/010')
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

    return request(app).get('/api/reservation/100')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.listing_id).toBe('100');
        expect(res.body).toHaveProperty('listing_id');
        expect(res.body).toHaveProperty('guests');
        expect(res.body).toHaveProperty('open_dates');
        expect(res.body).toHaveProperty('price');
        expect(res.body).toHaveProperty('review');
      });
  });

  it('Should return 500 when invalid GET request with string is made', async () => request(app).get('/api/reservation/blueberrySoju')
    .then((res) => {
      expect(res.statusCode).toBe(500);
    }));

  it('Should return 500 when invalid GET request with number is made', async () => request(app).get('/api/reservation/45647891328')
    .then((res) => {
      expect(res.statusCode).toBe(500);
    }));

  it('Should return 500 when invalid GET request with number and string is made', async () => request(app).get('/api/reservation/a45f6478y91d32az8')
    .then((res) => {
      expect(res.statusCode).toBe(500);
    }));

  it('Should return 404 when invalid GET request with unknown URL is made (test 1)', async () => request(app).get('/api/hello/reservation')
    .then((res) => {
      expect(res.statusCode).toBe(404);
    }));

  it('Should return 404 when invalid GET request with unknown URL is made (test 2)', async () => request(app).get('/api/123123')
    .then((res) => {
      expect(res.statusCode).toBe(404);
    }));

  it('Should return 404 when invalid GET request with unknown URL is made (test 3)', async () => request(app).get('/api/!@#$%')
    .then((res) => {
      expect(res.statusCode).toBe(404);
    }));
});
