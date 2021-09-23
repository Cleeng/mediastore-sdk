module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    'macros',
    [
      'inline-react-svg',
      {
        ignorePattern: 'IB',
        svgo: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: 'data-name'
              }
            },
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupIDs: true
                }
              }
            }
          ]
        }
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-private-property-in-object',
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
    exclude: ['/node_modules/']
  };
};
