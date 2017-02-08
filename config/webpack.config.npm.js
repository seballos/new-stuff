var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var url = require('url');
var paths = require('./paths');

var homepagePath = require(paths.appPackageJson).homepage;
var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/';
if (!publicPath.endsWith('/')) {
  // Prevents incorrect paths in file-loader
  publicPath += '/';
}

module.exports = {
  bail: true,
  devtool: 'cheap-module-source-map',
  target: 'node',
  externals: nodeExternals({}),
  entry: [
    require.resolve('./polyfills'),
  ],
  output: {
    path: paths.appLib,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: publicPath,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: paths.appSrc
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel',
        query: require('./babel.prod')
      },
      {
        test: /\.scss$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'style!' + 'css?sourceMap' + '!sass?sourceMap' + '-autoprefixer!postcss'
      },
      {
        test: /\.json$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  eslint: {
    // TODO: consider separate config for production,
    // e.g. to enable no-console and no-debugger only in prod.
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  postcss: function() {
    return [autoprefixer];
  },
};
