const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./compiled/bin.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      //title: 'webpack Boilerplate',
      template: path.resolve(__dirname, "./index.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),
  ],
};
