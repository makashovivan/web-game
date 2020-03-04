const path = require('path')
const HTMLWebpacplugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpacplugin({
      template: './src/index.html'
    })
  ]
}
