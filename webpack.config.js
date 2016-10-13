<<<<<<< HEAD
const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
  debug: true,
  devtool: 'eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    bundle: './app.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
=======
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: env === 'production' ? 'cheap-module-source-map' : 'eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './autosuggest/Autosuggest.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    // publicPath: '/dist/'
>>>>>>> master
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
        ],
      },
    ],
  },

<<<<<<< HEAD
  /*resolve: {
    extensions: ['', '.js'],
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
  },*/
=======
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
>>>>>>> master

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
<<<<<<< HEAD
  ],
};

module.exports = config;
=======
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
      },
    }),
  ],
};
>>>>>>> master
