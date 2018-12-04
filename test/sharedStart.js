const sharedStart = require('../src/sharedStart')
const expect = require('chai').expect

describe('sharedStart', () => {
  it('should compute the common geohash prefix', () => {
    const geohashes = [ 'u1516u', 'u1517h', 'u15175', 'u1516g', 'u1516e', 'u1516s' ]
    const commonPrefix = sharedStart(geohashes)
    expect(commonPrefix).to.equal('u151')
  });

  it('should compute the when there is no common geohash prefix', () => {
    const geohashes = [ 'u1516u', 'u1517h', 'u15175', 'ge4401', 'ge4402', 'ge4403' ]
    const commonPrefix = sharedStart(geohashes)
    expect(commonPrefix).to.equal('')
  });
});