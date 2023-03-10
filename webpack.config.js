const { resolve } = require('path');

const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const MODE_PRODUCTION = 'production';
const MODE_DEVELOPMENT = 'development';

const isProduction = process.env.NODE_ENV === MODE_PRODUCTION;

const config = {
  mode: MODE_DEVELOPMENT,
  target: ['web', 'es2015'],
  entry: resolve(__dirname, './src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? MODE_PRODUCTION : MODE_DEVELOPMENT),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: '' }],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3.27,
                shippedProposals: true,
              }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
};

if (isProduction) {
  config.mode = MODE_PRODUCTION;

  config.plugins = [
    ...config.plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[name].[contenthash].css',
      ignoreOrder: true,
    }),
  ];
} else {
  config.devtool = 'source-map';

  config.plugins = [
    ...config.plugins,
    new HotModuleReplacementPlugin({}),
  ];

  config.devServer = {
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
    static: {
      directory: resolve(__dirname, './assets'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
}

module.exports = config;
