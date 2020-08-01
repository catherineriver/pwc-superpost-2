const path = require('path');

module.exports = {
  configureWebpack: {
    output: {
      library: 'PwCAiChallenge2',
    },
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/special-pwc-superpost/'
    : '/',
  chainWebpack: (config) => {
    const apiClient = process.env.NODE_ENV === 'production' ? 'server' : 'mock';

    config.resolve.alias.set(
      'api-client',
      path.resolve(__dirname, `src/api/${apiClient}`),
    );

    config.optimization.delete('splitChunks');
  },
};
