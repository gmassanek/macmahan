var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  context: __dirname,
  entry: './app/assets/javascripts/entry.js',
};

config.output = {
  path: path.join(__dirname, 'public', 'assets', 'javascripts'),
  filename: 'bundle.js',
  publicPath: '/assets',
};

config.resolve = {
  extensions: ['', '.js'],
  modulesDirectories: [ 'node_modules' ],
};

