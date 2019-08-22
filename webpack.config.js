// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const NODE_DIR = path.resolve(__dirname, './node_modules');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        // include: APP_DIR,
        exclude: MONACO_DIR,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  output: {
    globalObject: 'self',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json', 'typescript', 'javascript'],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9002,
  },
};