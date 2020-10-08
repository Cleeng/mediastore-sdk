const path = require('path');
const webpack = require('webpack');

const { STORYBOOK_ENV } = process.env;
const pathToEnvFile = `../config/environments/${STORYBOOK_ENV ||
  'development'}.js`;
const ENV_CONF = require(pathToEnvFile); // eslint-disable-line import/no-dynamic-require

const imageInlineSizeLimit =
  parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT, 10) || 10000;

module.exports = {
  plugins: [new webpack.DefinePlugin(ENV_CONF)],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        loaders: ['file-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: imageInlineSizeLimit,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve('src')]
  }
};
