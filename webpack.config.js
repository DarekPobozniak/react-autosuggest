var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './app.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    // publicPath: '/dist/'
  },
    /*plugins: [
        new webpack.NoErrorsPlugin()
        ],*/
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
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
          'css'
        ]
      },
    ]
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
  ]
};
