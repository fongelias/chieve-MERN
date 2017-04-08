//DEPENDENCIES=============================================================
const path = require('path');

//Module==================================================================
module.exports = {
	entry: { //Where bundler starts
		test: './dev/js/app/app_containers/test.jsx'
	},
	output: { //Where budled code is to be saved
		path: path.resolve('dev/js/app/compiled_apps/'), 
		filename: '[name].js',
	},
	module: {
		loaders: [ //Transformations
			{test: /\.jsx$/, loader:'babel-loader', exclude: /node_modules/}
		]
	}
}