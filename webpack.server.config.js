const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "production",
  devtool: false,
  entry: "./server.js",
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname),
    filename: "server.min.js"
  },
  externals: [nodeExternals()]
}

