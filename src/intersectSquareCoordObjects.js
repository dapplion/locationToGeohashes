
/**
 * Intersect two coordinates objects. 
 * The object must have at least the 'ne' and 'sw' points
 * 
 * @param {Object} coordObj1 = { 
 *   ne: { lat: 22.34, lon: 114.19 },
 *   se: { lat: 22.29, lon: 114.19 },
 *   sw: { lat: 22.29, lon: 114.14 },
 *   nw: { lat: 22.34, lon: 114.14 } }
 * @param {Object} coordObj2 = { 
 *   ne: { lat: 22.32, lon: 114.16 },
 *   sw: { lat: 22.28, lon: 114.12 },
 * @returns {Object} interesction points or null = { 
 *   ne: { lat: 22.32, lon: 114.16 },
 *   sw: { lat: 22.29, lon: 114.14 } }
 */
function intersectSquareCoordObjects(coordObj1, coordObj2) {
    // Convert from sw, ne; lat, lon; to right, bottom...
    const parseCoords = (coordObj) => ({
        left: coordObj.sw.lon,
        right: coordObj.ne.lon,
        top: coordObj.sw.lat,
        bottom: coordObj.ne.lat
    })
    const rect1 = parseCoords(coordObj1)
    const rect2 = parseCoords(coordObj2)

    // Compute the interesction points
    const rectIntersect = {
        right: Math.min(rect1.right, rect2.right),
        left: Math.max(rect1.left, rect2.left),
        bottom: Math.min(rect1.bottom, rect2.bottom),
        top: Math.max(rect1.top, rect2.top),
    }
    // Compute the area to know if the intersect or not
    const x_overlap = Math.max(0, rectIntersect.right - rectIntersect.left);
    const y_overlap = Math.max(0, rectIntersect.bottom - rectIntersect.top);
    const overlapArea = x_overlap * y_overlap;

    // If they intersect return sw, ne; lat, lon; object.
    if (overlapArea) return {
        ne: { lat: rectIntersect.bottom, lon: rectIntersect.right },
        sw: { lat: rectIntersect.top, lon: rectIntersect.left }
    }
    // If they do NOT interesct return null
    else return null
}

module.exports = intersectSquareCoordObjects;
