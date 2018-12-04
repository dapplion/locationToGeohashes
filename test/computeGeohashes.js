const locationToGeohashes = require('../src')
const expect = require('chai').expect

describe('locationToGeohashes', () => {
  it('should compute a list of geohashes', () => {
    const point = { lat: 50.846916, lon: 4.3489353 }
    const resolution = 5
    const geohashes = locationToGeohashes(point, resolution)
    expect(geohashes).to.deep.equal(["u1517", "u1515", "u1514", "u1516"])
  });

  it('should not crash with a querry too far north', () => {
    const point = { lat: 89.846916, lon: 4.3489353 }
    const resolution = 5
    const geohashes = locationToGeohashes(point, resolution)
    expect(geohashes).to.deep.equal(["upgp5", "upgph", "upgpj", "upgpn", "upgpp", "upgr0", "upgr1", "upgr4", "upgr5", "upgrh", "upgrj", "upgrn", "upgrp", "upgx0", "upgx1"])
  });
});