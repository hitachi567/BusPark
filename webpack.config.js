const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// var nodeModules = {};
// fs.readdirSync("node_modules")
//   .filter(function(x) {
//     return [".bin"].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = "commonjs " + mod;
//   });

module.exports = {
  mode: process.NODE_ENV || "development",
  entry: "./src",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { publicPath: "dist" }
          }
        ]
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: "native-addon-loader",
            options: { name: "[name]-[hash].[ext]" }
          }
        ]
      }
    ]
  },
  //externals: {'aws-sdk': "console.log('aws-sdk')", 'node-pre-gyp': "console.log('node-pre-gyp')"},
  resolve: {
    extensions: [".js"]
  },
  plugins: [new CleanWebpackPlugin()]
};
