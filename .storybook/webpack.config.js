const path = require('path');

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(otf|svg|ttf|woff|woff2)$/,
        loaders: ['file-loader']
      }
    ]
  },
  resolve: {
    modules: [path.resolve('src'), 'node_modules']
  }
};
