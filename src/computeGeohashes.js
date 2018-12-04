const Geohash = require('latlon-geohash');
const geolib = require('geolib')
const findRelevantGeohashes = require('./findRelevantGeohashes')

// On non square cell areas, picking the bigger value geneates 
// a better representation of the target area than picking the smaller value.
const squareSideByResolution = {
    1: 5000*1000, // 5,009.4km x 4,992.6km
    2: 1252*1000,  // 1,252.3km x 624.1km
    3: 156*1000,  // 156.5km x 156km
    4: 40*1000, // 39.1km x 19.5km
    5: 5*1000, // 4.9km x 4.9km
    6: 1200, // 1.2km x 609.4m
    7: 150, // 152.9m x 152.4m
}

const maxNumberOfGeohashes = 15

/**
 * Converts an initialPoint.
 * WARNING: The earth coord range is: Latitude: -90 to 90 Longitude: -180 to 180
 * However, latitudes close to the poles (80-90) can cause troubles 
 * and return incorrect representations
 * 
 * @param {Object} point = { lat: 84.7246807873226, lon: -76.33747515479305 }
 * @param {Integer} resolution = 1-7
 * @param {Number} threshold = 0 =< threshold =< 1. The code computes which fraction of a geohash cell
 * is covered by the target area. If this fraction is less than the threshold, they will be ignored
 */
function computeGeohashes(point, resolution, threshold) {
    if (!point || typeof point !== 'object' || !('lat' in point) || !('lon' in point)) {
        throw Error(`The first argument must be an object with properties { lat: <Num>,  lon: <Num> }`)
    }
    if (!squareSideByResolution[resolution]) {
        throw Error(`The resolution selected ${resolution} is not supported. Please chose an integer between 1-7`)
    }
    if (isNaN(threshold) || threshold >= 1 || threshold <= 0) {
        throw Error(`The third argument must be a decimal number between 0-1, exclusive`)
    }

    // 1. Compute the target area. A square (meters wise, around the given point)
    //    targetArea = {
    //      ne: { lat: <Num>,  lon: <Num> },
    //      se: { lat: <Num>,  lon: <Num> },
    //      ...
    //    }
    const sqrt2 = 1.414
    const targetArea = {}
    const directions = { ne: 45, se: 135, sw: 225, nw: 315 }
    Object.keys(directions).forEach(direction => {
        const {latitude, longitude} = geolib.computeDestinationPoint(
            point, 
            squareSideByResolution[resolution]/sqrt2, 
            directions[direction]
        )
        targetArea[direction] = {lat: latitude, lon: longitude}
    })

    // 2. Compute the relevant geohashes recursively, 
    //    starting from the initial geohash with the given resolution
    const geohashes = findRelevantGeohashes({
        geohash: Geohash.encode(point.lat, point.lon, resolution),
        targetArea,
        threshold
    })
    return Object.values(geohashes)
        .filter(r => r.overlapRatio > threshold)
        .map(r => r.geohash)
        .slice(0, maxNumberOfGeohashes)
}

module.exports = computeGeohashes;
