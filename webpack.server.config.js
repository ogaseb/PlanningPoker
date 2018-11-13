const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  },
  externals: nodeModules
}

