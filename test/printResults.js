// Print results
function printResults(relevantGeohashes) {
    // Get max min x, y
    let limits = {
        x: {max: 0, min: 0},
        y: {max: 0, min: 0},
    }
    Object.values(relevantGeohashes).forEach(({gridPosition}) => {
        const {x, y} = gridPosition
        if (x > limits.x.max) limits.x.max = x
        if (x < limits.x.min) limits.x.min = x
        if (y > limits.y.max) limits.y.max = y
        if (y < limits.y.min) limits.y.min = y
    })

    let line = `${String('').padStart(3)} | `
    for (let x = limits.x.min; x <= limits.x.max; x++) {
        line += String(x).padStart(3) + '  '
    }
    console.log(line)
    line = `${String('-').padStart(3)}-+-`
    for (let x = limits.x.min; x <= limits.x.max; x++) {
        line += String('--').padStart(3) + '--'
    }
    console.log(line)
    for (let y = limits.y.min; y <= limits.y.max; y++) {
        let line = `${String(y).padStart(3)} | `
        for (let x = limits.x.min; x <= limits.x.max; x++) {
            const obj = Object.values(relevantGeohashes).find(_obj => _obj.gridPosition.x == x && _obj.gridPosition.y == y)
            const num = (obj || {}).geohash || 0
            line += String(Math.round(100*num)).padStart(3) + '  '
        }
        console.log(line)
    }
}

module.exports = printResults;
