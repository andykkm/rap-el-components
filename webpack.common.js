const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
  performance: {
    hints: false,
  },
  devtool: false,
  mode: 'production',
  entry: path.resolve(__dirname, 'packages/index.js'),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'rap-el.js',
    libraryExport: 'default',
    library: 'RapEl',
    libraryTarget: 'umd',
    clean: true,
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
    extensions: ['.webpack.js', '.js', '.vue', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [new VueLoaderPlugin()],
}
