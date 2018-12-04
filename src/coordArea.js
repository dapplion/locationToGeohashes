const geolib = require('geolib')

/**
 * Computes the surface of a polygon of coordinates. 
 * It assumes that the coordinates describe almost a rectangle, 
 * where the vertical sides are almost paralel to meridians
 * 
 * @param {Object} coordObj = { 
 *   ne: { lat: 22.34, lon: 114.19 },
 *   se: { lat: 22.29, lon: 114.19 },
 *   sw: { lat: 22.29, lon: 114.14 },
 *   nw: { lat: 22.34, lon: 114.14 } }
 * @returns {Integer} surface (meters), i.e. 24884922
 */
function coordArea(coordObj) {
    // If only sw and ne are defined, fill nw and se assuming a perfect rectangle
    if (!coordObj.nw) coordObj.nw = {lat: coordObj.ne.lat, lon: coordObj.sw.lon}
    if (!coordObj.se) coordObj.se = {lat: coordObj.sw.lat, lon: coordObj.ne.lon}

    const top = geolib.getDistance(coordObj.ne, coordObj.nw)
    const bottom = geolib.getDistance(coordObj.se, coordObj.sw)
    const right = geolib.getDistance(coordObj.ne, coordObj.se)
    const left = geolib.getDistance(coordObj.nw, coordObj.sw)

    // Ignore curvatures and approximate by averaging sides
    return ((top+bottom)/2) * ((right+left)/2)
}

module.exports = coordArea;
