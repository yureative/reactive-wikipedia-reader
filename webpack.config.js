var DEBUG = process.env.NODE_ENV !== 'production' ? true : false;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function getEntrySources(sources) {
  if (DEBUG) {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}
function getPlugins(plugins) {
  if (!DEBUG) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
  return plugins;
}

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'jsx', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: DEBUG ? 'style!css!sass' : ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=assets/images/[name].[ext]?[hash]',
          'image-webpack?bypassOnDebug&optimizationLevel=7'
        ]
      }
    ]
  },
  plugins: getPlugins([
    new HtmlWebpackPlugin({
      title: 'Reactive Wikipedia Reader',
      favicon: './app/assets/images/icon/favicon.ico'
    }),
    new ExtractTextPlugin('assets/style.css', {allChunks: true})
  ]),
  entry: {
    bundle: getEntrySources([
      './app/index'
    ])
  },
  output: {
    path: 'public',
    publicPath: '/',
    filename: 'assets/[name].js'
  }
}
