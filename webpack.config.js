var path = require('path');
var webpack = require('webpack');

var config = {
  context: __dirname,
  entry: './app/assets/javascripts/entry.js',
  output: {
    path: path.join(__dirname, 'public', 'assets', 'javascripts'),
    filename: 'bundle.min.js',
    publicPath: '/assets',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [ 'node_modules' ],
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true, compress: true}),
  ]
};

module.exports = config;
