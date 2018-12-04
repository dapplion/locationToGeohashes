# locationToGeohashes

Given a location (lat, lon) that represents an square area, it is converted to an array of geohashes that better represent that area.

## Usage

```
const point = { lat: 50.846916, lon: 4.3489353 }
const resolution = 5
const geohashes = locationToGeohashes(point, resolution)
// geohashes = ["u1517", "u1515", "u1514", "u1516"]
```
