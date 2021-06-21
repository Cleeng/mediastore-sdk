// const sandboxEnvironment = require('./config/environments/sandbox');

module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    'macros',
    // 'transform-inline-environment-variables',
    // [
    //   'transform-define',
    //   {
    //     ...sandboxEnvironment
    //   }
    // ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true
      }
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          test: './test',
          underscore: 'lodash'
        }
      }
    ]
  ];

  return {
    presets,
    plugins,
    ignore: [/node_modules/]
  };
};
