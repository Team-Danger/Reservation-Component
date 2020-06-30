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

// describe('API GET Request Unit Test ', () => {
//   it('Should return 200 and response when GET request is made with valid end-point and request params', async () => {
//     jest.setTimeout(90000);
//     const testListingOne = new Listing(await generateMockData('001'));
//     Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
//       if (listing_id === '001') {
//         resolve(testListingOne);
//       } else {
//         reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
//       }
//     });
//     return request(app).get('/api/001/reservation')
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toEqual(JSON.stringify(testListingOne));
//       });
//   });

//   it('Should return 200 and response when GET request is made with valid end-point and request params', async () => {
//     jest.setTimeout(90000);
//     const testListingTen = new Listing(await generateMockData('010'));
//     Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
//       if (listing_id === '010') {
//         resolve(testListingTen);
//       } else {
//         reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
//       }
//     });
//     return request(app).get('/api/010/reservation')
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toEqual(JSON.stringify(testListingTen));
//       });
//   });

//   it('Should return 200 and response when GET request is made with valid end-point and request params', async () => {
//     jest.setTimeout(90000);
//     const testListingHundred = new Listing(await generateMockData('100'));
//     Listing.findOne = ({ listing_id }) => new Promise((resolve, reject) => {
//       if (listing_id === '100') {
//         resolve(testListingHundred);
//       } else {
//         reject(new Error(`Mock Error From api.spec.js. listing_id : ${listing_id}`));
//       }
//     });

//     return request(app).get('/api/100/reservation')
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toEqual(JSON.stringify(testListingHundred));
//       });
//   });











  // it('Should return valid response when valid GET request is made', async () => {
  //   const responseOne = await request(app).get('/api/001/reservation');
  //   const responseTen = await request(app).get('/api/010/reservation');
  //   const responseHundred = await request(app).get('/api/100/reservation');

  //   expect(responseOne.body).toHaveProperty('listing_id');
  //   expect(responseOne.body).toHaveProperty('guests');
  //   expect(responseOne.body).toHaveProperty('open_dates');
  //   expect(responseOne.body).toHaveProperty('price');
  //   expect(responseOne.body).toHaveProperty('review');

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
// });
