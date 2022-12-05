const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const corePath = path.join(__dirname, '../core');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[corePath];
      }
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
};
