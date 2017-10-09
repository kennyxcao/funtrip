var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  devtool: 'source-map',  

  entry: `${SRC_DIR}/index.jsx`,

  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/react-client/dist/'    
  },

  plugins: [
  ],  
  
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { 
        test: /\.css?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, '/react-client/css') 
      },
      { 
        test: /\.png$/,
        loader: 'file' 
      },
      { 
        test: /\.jpg$/,
        loader: 'file' 
      },      
      { 
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }      
    ]
  }
};
