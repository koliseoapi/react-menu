const webpack = require('webpack');
const path = require("path");

module.exports = function(stats) {

  return {
    entry: {
      'test': path.resolve('./test/test.js')
    },
    output: {
      path: path.resolve('./build/'),
      filename: '[name].js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
    }
  }

}
