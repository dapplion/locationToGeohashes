const locationToGeohashes = require('../src')
const expect = require('chai').expect

// searching 100000 items: 136.630ms
// searching 100 items: 1.217ms

describe('How to use to find hashtag items', () => {
    it('Should find valid items, within the provided range', () => {
        // Generate known + random items
        const itemNum = 100
        const items = {
            item_good_1: locationToGeohashes({ lat: 50.80, lon: 4.349 }, 5),
            item_good_2: locationToGeohashes({ lat: 50.85, lon: 4.348 }, 6),
            item_nahh_3: locationToGeohashes({ lat: 50.10, lon: 4.043 }, 5)
        }
        for (let i=0; i<itemNum; i++) {
            hashtagName = `item_${i}`
            items[hashtagName] = locationToGeohashes({
                lat: 50.85+0.2*(2*Math.random()-1),
                lon: 4.35+0.2*(2*Math.random()-1)
            }, 4+Math.floor(3*Math.random()))
        }

        // Generate the user position
        user = locationToGeohashes({ lat: 50.85, lon: 4.349 }, 5)

        // Time it
        console.time(`searching ${itemNum} items`)

        // Run the search algorythm
        // Per item, check if any geohash of the item starts with any geohash of the user
        // Only user geohashes can englobe smaller geohash items, not the other way
        // -> If the user selects a small area (city), he doesnt care about national or global item geohashes
        // -> But if he selects a big area (national), he wants to see all items within it, including the city ones
        // NOTE: By returning true on first occurence, the search process if significantly speed up
        const matchingItems = Object.keys(items).filter(itemKey => {
            for (userGeohash of user) {
                for (itemGeohash of items[itemKey]) {
                    if (itemGeohash.startsWith(userGeohash)) return true
                }
            }
        })

        // Return time
        console.timeEnd(`searching ${itemNum} items`)
        expect(matchingItems).to.have.length.greaterThan(1)
        expect(matchingItems).to.include('item_good_1')
        expect(matchingItems).to.include('item_good_2')
        console.log(matchingItems)
    })
});