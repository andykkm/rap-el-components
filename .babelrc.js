module.exports = {
  presets: [
    ['@babel/preset-env', {useBuiltIns: 'usage'}],
    '@babel/preset-typescript',
    '@vue/babel-preset-jsx',
  ],
  plugins: [
    ['component', {libraryName: 'element-ui', styleLibraryName: 'theme-chalk'}],
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
  ],
}
