const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const path = require("path");
const ruleForJavaScript = {
  test: /\.js$/,
  loader: "babel-loader",
  options: {
    presets: [["@babel/preset-react", { runtime: "automatic" }]],
  },
};

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const ruleForMQTT = {
  test: [/.*mqtt\.js$/, /.*sub\.js$/, /.*pub\.js$/],
  use: "shebang-loader",
};

const rules = [ruleForJavaScript, ruleForStyles, ruleForMQTT];
module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";
  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(__dirname, "build"),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      new webpack.NormalModuleReplacementPlugin(/^mqtt$/, "mqtt/dist/mqtt.js"),
    ],
    module: { rules },
    devServer: {
      // contentBase: path.resolve(__dirname, 'build'), default,
      open: true, // para abrir el navegador
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
  };
};
