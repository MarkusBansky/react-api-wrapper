const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  // bundling mode
  mode: 'production',

  // entry files
  entry: './src/index.ts',

  // output bundles (location)
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'main.js',
  },

  // file resolutions
  resolve: {
    extensions: [ '.ts', '.js' ],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },

  // plugins
  plugins: [
    new ForkTsCheckerWebpackPlugin(), // run TSC on a separate thread
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.tsx?$/,
      exclude: [/node_modules/,/lib/],
      parallel: true,
    })],
  },

  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],

  // generate source map
  devtool: 'source-map',
};
