const webpack = require('./webpack.config.cjs')
const os = require('os')
const path = require('path')

// https://github.com/codymikol/karma-webpack/issues/498#issuecomment-790040818
const output = {
  path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000)
}

module.exports = config => {
  config.set({
    plugins: [
      'karma-webpack'
    , 'karma-jasmine'
    , 'karma-chrome-launcher'
    ]
  , frameworks: ['jasmine']
  , files: [
      '__tests__/**/*.spec.+(ts|tsx)'
    , {
        pattern: `${output.path}/**/*`
      , watched: false
      , included: false
      }
    ]
  , preprocessors: {
      '__tests__/**/*.spec.+(ts|tsx)': ['webpack']
    }
  , browsers: ['ChromeHeadless']
  , webpack: {
      ...webpack
    , output
    }
  })
}
