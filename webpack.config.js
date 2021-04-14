const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "docs"),
    filename: (pathData) => {
      return pathData.chunk.name === "index" ? "bundle.js" : "[name].bundle.js";
    },
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  target: ["web", "es5"],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    port: 3000,
    hot: true,
  },
  plugins: [new CleanWebpackPlugin()],
};

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: key + ".html",
      inject: true,
      chunks: [key], // insert to the root of output folder
    })
  );
});

module.exports = config;
