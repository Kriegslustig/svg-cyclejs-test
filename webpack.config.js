const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const dev = process.env.NODE_ENV !== 'production'
const plugins = []

if (!dev) plugins.push(new webpack.optimize.UglifyJsPlugin())
if (!dev) plugins.push(new webpack.optimize.DedupePlugin())

module.exports = {
  entry: {
    main: './entry'
  },
  output: {
    filename: 'dist.js',
    path: __dirname
  },
  plugins,
  module: { loaders: [
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets=es2015'
    },
    {
      test: /\.css$/,
      loader:
        (dev
          ? 'css-loader?-minimize!postcss-loader'
          : 'css-loader?minimize!postcss-loader'
        )
    }
  ] },
  postcss: () => [autoprefixer]
}

