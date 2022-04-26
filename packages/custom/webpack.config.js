// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const publicPath = path.join("components", "bar");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "..", "server", "client", publicPath),
    filename: "index.js",
    publicPath,
    clean: true,
  },
  devServer: {
    open: false,
    host: "localhost",
  },
  plugins: [],
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
  externals: {
    react: "react",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: isProduction ? false : "cheap-module-source-map",
};

module.exports = async () => {
  //чтобы собирался после root-app
  await sleep(3000);

  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
