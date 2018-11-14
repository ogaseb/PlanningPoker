const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.node.js"
  },
  externals: [nodeExternals()]
}

