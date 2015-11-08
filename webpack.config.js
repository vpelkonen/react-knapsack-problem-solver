var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

config = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname,'app/main.js')
	],
	output:{
		path: path.resolve(__dirname,'build'),
		filename:'bundle.js'
	},
	module: {
		loaders: [
			{ test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
            loader: "imports?this=>window!exports?window.Modernizr" },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.scss$/, loader: 'style!css!sass' },
    		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	}
};


module.exports = config;