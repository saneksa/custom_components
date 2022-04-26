// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "..", "server", "client"),
    clean: true,
  },
  devServer: {
    open: false,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "assets/index.html",
    }),
    new webpack.ProvidePlugin({
      react: "react",
      React: "react",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ["/node_modules/"],
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: isProduction ? false : "cheap-module-source-map",
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
