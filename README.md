# locationToGeohashes

Given a location (lat, lon) that represents an square area, it is converted to an array of geohashes that better represent that area.

## Usage

```javascript
const point = { lat: 50.846916, lon: 4.3489353 };
const resolution = 5;
const geohashes = locationToGeohashes(point, resolution);
// geohashes = ["u1517", "u1515", "u1514", "u1516"]
```

## Resolution parameter

Associated square side to a specific resolution. The square side is picked to minimize the number of geohashes necessary to represent the target area and to be small enough to represent it appropiately.

```
  1: 5000*1000,  // 5,009.4km x 4,992.6km
  2: 1252*1000,  // 1,252.3km x 624.1km
  3: 156*1000,   // 156.5km x 156km
  4: 40*1000,    // 39.1km x 19.5km
  5: 5*1000,     // 4.9km x 4.9km
  6: 1200,       // 1.2km x 609.4m
  7: 150,        // 152.9m x 152.4m
```

## How does this look like?

In this example you can see the outcome of requesting a resolution 5 around an arbitrary point in the center of Antwerp.
The target area for resolution 5 is a 4.9 x 4.9km square, which is best represented by geohashes: [ 'u155m', 'u155k' ].

![geohash-demo](/doc/geohash-demo.png)

## Search algorythm

Per item, check if any geohash of the item starts with any geohash of the user
Only user geohashes can englobe smaller geohash items, not the other way:

- If the user selects a small area (city), he doesnt care about national or global item geohashes
- But if he selects a big area (national), he wants to see all items within it, including the city ones

> NOTE: By returning true on first occurence, the search process if significantly speed up

```javascript
// 1. Prepare the items
const items = {
  item_01: [ 'u1514', 'u1515', 'u150g', 'u150f' ],
  item_02: [ 'u1516c', 'u15171', 'u15170', 'u1516b' ],
  ...
};

// 2. Generate the user position
const user = locationToGeohashes({ lat: 50.85, lon: 4.349 }, 5)
// user = [ 'u1514', 'u1515' ]

// 3. Check matches
const matchingItems = Object.keys(items).filter(itemKey => {
  for (userGeohash of user) {
    for (itemGeohash of items[itemKey]) {
      if (itemGeohash.startsWith(userGeohash)) return true;
    }
  }
});

// matchingItems = [ 'item_17', 'item_23', 'item_30', 'item_36', 'item_74', 'item_81' ]
```
