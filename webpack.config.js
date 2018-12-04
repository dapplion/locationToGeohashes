const path = require('path');

module.exports = {
  entry: './src',
  output: {
    filename: 'locationToGeohashes.min.js',
    path: path.resolve(__dirname)
  }
};