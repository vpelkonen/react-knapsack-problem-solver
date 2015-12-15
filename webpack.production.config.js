/*var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
			{ test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/, exclude: [node_modules_dir],
        loader: "imports?this=>window!exports?window.Modernizr" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.scss$/, loader: 'style!css!sass' },
  		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};

module.exports = config;*/
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [node_modules_dir], loader: 'babel'},
      { test: /\.scss$/, loader: 'style!css!sass' }]
  }
};

module.exports = config;