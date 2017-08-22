const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/Route.js',
  output: {
    filename: 'route.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  }
//    plugins: [
//    new webpack.optimize.UglifyJsPlugin({
//     minimize: false,
//     compress: false
//    })
//  ]
};