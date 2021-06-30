const CracoAlias = require('craco-alias');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './src',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
             are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/app/components/public.ts'),
      '@scss': path.resolve(__dirname, 'src/app/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@redux': path.resolve(__dirname, 'src/app/redux'),
      '@core': path.resolve(__dirname, 'src/app/core/public.ts'),
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
};
