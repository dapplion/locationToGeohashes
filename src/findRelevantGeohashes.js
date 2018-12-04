const Geohash = require('latlon-geohash');
const getGeohashOverlapRatio = require('./getGeohashOverlapRatio')

/**
 * 
 * @param {String} geohash Initial geohash
 * @param {Object} targetArea 
 * @param {Object} geohashes Object to store the results recursively
 * @returns {Object} geohashes
 */
function findRelevantGeohashes({geohash, targetArea, threshold, geohashes = {}, count = 1}) {
    if (count++ > 100) return console.warn(`findRelevantGeohashes looped ${count} times, stopping`)
    
    // Compute the 8 geohashes surrounding the given geohash, and append it as the center cell
    const neighbours = Geohash.neighbours(geohash)
    neighbours.c = geohash
    
    // Iterate over all directions and compute the overlapRatios
    Object.keys(neighbours).map(dir => {
        const overlapRatio = getGeohashOverlapRatio(neighbours[dir], targetArea)
        return { geohash: neighbours[dir], overlapRatio }
    })
    // Then, check for infinite loops and call the function recursively
    .forEach(r => {
        // If the geohash has been computed before, skip; otherwise, store
        if (geohashes[r.geohash]) return
        else geohashes[r.geohash] = r
        // If this geohash is relevant, compute its surroudings
        if (r.overlapRatio > threshold)
            findRelevantGeohashes({geohash: r.geohash, targetArea, threshold, geohashes, count})
    })
    return geohashes
}

module.exports = findRelevantGeohashes;
