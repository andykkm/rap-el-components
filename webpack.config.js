const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const basePath = 'dist'
const historyModeConfig = {
  publicPath: '/',
  pages: {},
}
function genHistoryApiFallbackRewrites(baseUrl, pages = {}) {
  const multiPageRewrites = Object.keys(pages)
    .sort((a, b) => b.length - a.length)
    .map(name => ({
      from: new RegExp(`^/${name}`),
      to: path.posix.join(baseUrl, pages[name].filename || `${name}.html`),
    }))
  return [...multiPageRewrites, {from: /./, to: path.posix.join(baseUrl, 'index.html')}]
}
module.exports = (env = {}, argv) => {
  const PRO_ENV = env.PRO_ENV || 'DEV'
  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        PRO_ENV: JSON.stringify(PRO_ENV),
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'components-demo',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
    }),
  ]
  return {
    performance: {
      hints: false,
    },
    devtool: PRO_ENV === 'DEV' ? 'source-map' : false,
    mode: PRO_ENV === 'DEV' ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
      publicPath: '/',
      filename: 'js/[name].[contenthash].js',
      path: path.resolve(__dirname, basePath),
      clean: true,
    },
    externals: {},
    optimization: {
      minimize: PRO_ENV === 'PROD',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              pure_funcs: [],
            },
          },
        }),
      ],
      runtimeChunk: 'single',
      sideEffects: true,
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
          },
        },
      },
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
        rewrites: genHistoryApiFallbackRewrites(
          historyModeConfig.publicPath,
          historyModeConfig.pages
        ),
      },
      port: 20000,
      open: true,
      hot: true,
    },
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
    plugins: plugins,
  }
}
