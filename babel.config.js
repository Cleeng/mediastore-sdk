module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ];
  const plugins = [
    'macros',
    '@babel/plugin-transform-runtime',
    [
      'inline-react-svg',
      {
        ignorePattern: 'IB',
        svgo: {
          plugins: [
            'preset-default',
            {
              name: 'removeAttrs',
              params: {
                attrs: 'data-name'
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
          underscore: 'lodash',
          components: './src/components'
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
