const path = require('path');
const webpack = require('webpack');

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

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
  ],
};

module.exports = config;
