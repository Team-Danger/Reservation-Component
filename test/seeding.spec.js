const assert = require('assert');
const Listing = require('../database/Listing.js');
const generateMockData = require('../database/seed.js');

describe('Seeded Mock Data Unit Test', () => {
  it('Should have valid seeded data', () => {
    const mockListingForTest = new Listing(generateMockData(1));
    return mockListingForTest.validate()
      .then((err) => {
        expect(err).toBe(undefined);
      })
      .catch((err) => {
        assert.fail(err);
      });
  });

  it('Should have valid zero-padded listing ID', () => {
    const listingOne = generateMockData(1);
    const listingTen = generateMockData(10);
    const listingHundred = generateMockData(100);

    expect(listingOne.listing_id).toBe('001');
    expect(listingTen.listing_id).toBe('010');
    expect(listingHundred.listing_id).toBe('100');
  });

  it('Should have valid type and within range for guest data', () => {
    const listingFive = generateMockData(5);
    const listingFifty = generateMockData(50);
    const listingNinetyFive = generateMockData(95);

    expect(typeof listingFive.guests.total).toBe('number');
    expect(listingFive.guests.total).toBeLessThan(10);
    expect(listingFive.guests.adults).toBeLessThan(4);
    expect(listingFive.guests.adults).toBeGreaterThanOrEqual(1);
    expect(listingFive.guests.children).toBeLessThan(4);
    expect(listingFive.guests.infants).toBeLessThan(4);

    expect(typeof listingFifty.guests.total).toBe('number');
    expect(listingFifty.guests.total).toBeLessThan(10);
    expect(listingFifty.guests.adults).toBeLessThan(4);
    expect(listingFifty.guests.adults).toBeGreaterThanOrEqual(1);
    expect(listingFifty.guests.children).toBeLessThan(4);
    expect(listingFifty.guests.infants).toBeLessThan(4);

    expect(typeof listingNinetyFive.guests.total).toBe('number');
    expect(listingNinetyFive.guests.total).toBeLessThan(10);
    expect(listingNinetyFive.guests.adults).toBeLessThan(4);
    expect(listingNinetyFive.guests.adults).toBeGreaterThanOrEqual(1);
    expect(listingNinetyFive.guests.children).toBeLessThan(4);
    expect(listingNinetyFive.guests.infants).toBeLessThan(4);
  });

  it('Should have open dates array', () => {
    const listingThree = generateMockData(3);
    const listingFiftyThree = generateMockData(53);
    const listingNinetyThree = generateMockData(93);

    expect(Array.isArray(listingThree.open_dates)).toBe(true);
    expect(Array.isArray(listingFiftyThree.open_dates)).toBe(true);
    expect(Array.isArray(listingNinetyThree.open_dates)).toBe(true);
  });

  it('Should have valid price value', () => {
    const listingSeven = generateMockData(7);
    const listingFiftySeven = generateMockData(57);
    const listingNinetySeven = generateMockData(97);

    expect(typeof listingSeven.price).toBe('number');
    expect(listingSeven.price).toBeLessThanOrEqual(765);
    expect(listingSeven.price).toBeGreaterThanOrEqual(30);

    expect(typeof listingFiftySeven.price).toBe('number');
    expect(listingFiftySeven.price).toBeLessThanOrEqual(765);
    expect(listingFiftySeven.price).toBeGreaterThanOrEqual(30);

    expect(typeof listingNinetySeven.price).toBe('number');
    expect(listingNinetySeven.price).toBeLessThanOrEqual(765);
    expect(listingNinetySeven.price).toBeGreaterThanOrEqual(30);
  });

  it('Should have valid review value', () => {
    const listingForty = generateMockData(40);
    const listingSixty = generateMockData(60);
    const listingEighty = generateMockData(80);

    expect(typeof listingForty.review).toBe('number');
    expect(listingForty.review).toBeLessThanOrEqual(5);
    expect(listingForty.review).toBeGreaterThanOrEqual(0);

    expect(typeof listingSixty.review).toBe('number');
    expect(listingSixty.review).toBeLessThanOrEqual(5);
    expect(listingSixty.review).toBeGreaterThanOrEqual(0);

    expect(typeof listingEighty.review).toBe('number');
    expect(listingEighty.review).toBeLessThanOrEqual(5);
    expect(listingEighty.review).toBeGreaterThanOrEqual(0);
  });
});
