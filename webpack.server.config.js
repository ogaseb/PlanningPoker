const path = require('path');
const serverConfig = {
  target: 'node',
  entry: './server.js',
  externals: {
    uws: "uws"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
};

module.exports = serverConfig