const computeGeohashes = require('./computeGeohashes')
const sharedStart = require('./sharedStart')

/**
 * Converts an initialPoint to an array of geohashes
 * 
 * @param {Object} point = { lat: 84.7246807873226, lon: -76.33747515479305 }
 * @param {Integer} resolution = 1-7
 * @param {Number} threshold = 0 =< threshold =< 1. The code computes which fraction of a geohash cell
 * is covered by the target area. If this fraction is less than the threshold, they will be ignored
 * Default value = 0.15
 */
function locationToGeohashes(point, resolution, threshold = 0.15) {
    const geohashes = computeGeohashes(point, resolution, threshold)
    return geohashes
}

module.exports = locationToGeohashes;
