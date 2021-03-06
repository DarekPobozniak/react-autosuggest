const path = require('path');

const config = {
  debug: true,
  devtool: 'source-map',
  context: path.join(__dirname, './src/autosuggest'),
  entry: './Autosuggest.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'Autocomplete',
    libraryTarget: 'umd',
  },

  externals: {
    // Use external version of React
    react: 'react',
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

  resolve: {
    extensions: ['', '.js'],
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
  },
};

module.exports = config;
