const Geohash = require('latlon-geohash');
const intersectSquareCoordObjects = require('./intersectSquareCoordObjects')
const coordArea = require('./coordArea')

/**
 * Computes how much geohash cell is covered by the interesection with the target area
 * 
 * @param {String} geohash 
 * @param {Object} targetArea 
 * @returns {Integer} Return value is always and integer between 0 and 1
 */
function getGeohashOverlapRatio(geohash, targetArea) {
    const bounds = Geohash.bounds(geohash)
    const intersection = intersectSquareCoordObjects(bounds, targetArea)
    // If there is no intersection, skip computations below
    return intersection ? coordArea(intersection)/coordArea(bounds) : 0
}

module.exports = getGeohashOverlapRatio;
