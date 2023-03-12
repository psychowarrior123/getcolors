const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // точка входа, о которой говорилось ранее.
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // сопоставляет файлы .js, .ts, и .tsx
        loader: "babel-loader", // использует для указанных типов файлов загрузчик babel-loader (ts-loader не требуется).
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // сопоставляет только файлы .css (т.е. не .scss и др.)
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js", // выходной бандл
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public/"),
    },
    port: 3001,
    devMiddleware: {
      publicPath: "https://localhost:3001/dist/",
    },
    hot: "only",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.png",
      template: "./public/index.html",
    }),
  ], // used for hot reloading when developing
  devtool: "eval-source-map", // создает высококачественные карты кода
};
