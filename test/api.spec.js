const request = require('supertest');
const _ = require('lodash');
require('regenerator-runtime'); // polyfill is depricated, use regenerator-runtime

const app = require('../server/app.js');

describe('API GET Request Unit Test ', () => {
  it('Should return 200 and response when GET request is made with valid end-point and request params', async () => {
    jest.setTimeout(30000);
    const responseOne = await request(app).get('/api/001');
    const responseTen = await request(app).get('/api/010');
    const responseHundred = await request(app).get('/api/100');

    expect(responseOne.status).toBe(200);
    expect(responseTen.status).toBe(200);
    expect(responseHundred.status).toBe(200);

    expect(typeof responseOne.body).toBe('object');
    expect(typeof responseTen.body).toBe('object');
    expect(typeof responseHundred.body).toBe('object');

    expect(_.isEmpty(responseOne.body)).toBe(false);
    expect(_.isEmpty(responseTen.body)).toBe(false);
    expect(_.isEmpty(responseHundred.body)).toBe(false);
  });

  it('Should return 204 and empty response when GET request is made with invalid request params', async () => {
    jest.setTimeout(30000);
    const invalidResponseNum = await request(app).get('/api/1');
    const invalidResponseStr = await request(app).get('/api/HelloWorld');

    expect(invalidResponseNum.status).toBe(204);
    expect(invalidResponseStr.status).toBe(204);

    expect(_.isEmpty(invalidResponseNum.body)).toBe(true);
    expect(_.isEmpty(invalidResponseStr.body)).toBe(true);
  });

  it('Should return valid response when valid GET request is made', async () => {
    const responseOne = await request(app).get('/api/001');
    const responseTen = await request(app).get('/api/010');
    const responseHundred = await request(app).get('/api/100');

    expect(responseOne.body).toHaveProperty('listing_id');
    expect(responseOne.body).toHaveProperty('guests');
    expect(responseOne.body).toHaveProperty('open_dates');
    expect(responseOne.body).toHaveProperty('price');
    expect(responseOne.body).toHaveProperty('review');

    expect(responseTen.body).toHaveProperty('listing_id');
    expect(responseTen.body).toHaveProperty('guests');
    expect(responseTen.body).toHaveProperty('open_dates');
    expect(responseTen.body).toHaveProperty('price');
    expect(responseTen.body).toHaveProperty('review');

    expect(responseHundred.body).toHaveProperty('listing_id');
    expect(responseHundred.body).toHaveProperty('guests');
    expect(responseHundred.body).toHaveProperty('open_dates');
    expect(responseHundred.body).toHaveProperty('price');
    expect(responseHundred.body).toHaveProperty('review');
  });

  it('Should return response with matching listing ID', async () => {
    const responseOne = await request(app).get('/api/001');
    const responseTen = await request(app).get('/api/010');
    const responseHundred = await request(app).get('/api/100');

    expect(responseOne.body.listing_id).toBe('001');
    expect(responseTen.body.listing_id).toBe('010');
    expect(responseHundred.body.listing_id).toBe('100');
  });
});