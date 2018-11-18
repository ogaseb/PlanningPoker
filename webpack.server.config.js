const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "production",
  entry: "./server.js",
  node: {
    __dirname: true,
  },
  output: {
    path: path.resolve(__dirname),
    filename: "lib.node.js"
  },
  externals: [nodeExternals()]
}

