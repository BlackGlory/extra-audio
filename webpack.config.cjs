const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  target: 'web'
, mode: 'development'
, resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  , plugins: [new TsconfigPathsPlugin()]
  , extensionAlias: {
      '.js': ['.ts', '.js']
    }
  }
, module: {
    rules: [
      {
        test: /\.tsx?$/
      , exclude: /node_module/
      , use: 'ts-loader'
      }
    , {
        test: /\.(wav)$/i
      , type: 'asset/resource'
      }
    ]
  }
}
