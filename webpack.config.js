const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ruleForJavaScript =
{
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: [['@babel/preset-react', {runtime: 'automatic'}]]
  }
};

const ruleForStyles = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const rules = [ruleForJavaScript, ruleForStyles]
module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === 'production';
  return (
    {
      // entry: './src/index.js',
      output: {
        filename: isProduction
          ? '[name].[contenthash].js'
          : 'main.js',
        path: path.resolve(__dirname, 'build')
      },
      plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'})
      ],
      module: { rules },
      devServer: {
        // contentBase: path.resolve(__dirname, 'build'), default,
        open: true, // para abrir el navegador
        client: {
          overlay: {
            warnings: false,
            errors: true
          }
        },
        compress: true,
        port: 3000,
      },
      devtool: 'source-map',
    }
  );
}

