const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    players: './src/index.js',
    logo: './src/logo.js',
  },
  devServer: {
    port: 8081,
    static: {
      directory: path.resolve(__dirname, './build'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '',
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'logo.html',
      title: 'Logo',
      template: 'src/index.html',
      chunks: ['logo'],
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'players.html',
      title: 'Players',
      chunks: ['players'],
      template: 'src/index.html',
      minify: false,
    }),
  ],
};
