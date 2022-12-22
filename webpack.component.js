const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const Components = require('./components.json')
module.exports = {
  performance: {
    hints: false,
  },
  devtool: false,
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(__dirname, './lib'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /.png|.jpg|.gif|.svg/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.js', '.vue', '.ts', '.jsx', '.tsx', 'json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [new VueLoaderPlugin()],
}
