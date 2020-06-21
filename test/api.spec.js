const request = require('supertest');
const app = require('../server/index.js');

describe('API GET Request Unit Test ', () => {
  test('It should respond with an array of students', async () => {
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
