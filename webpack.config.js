const path = require('path');

module.exports = {
  context: __dirname,
  entry: './trailmapper.jsx',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions:['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
