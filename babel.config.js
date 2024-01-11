module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'classic' }]
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
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          test: './test',
          underscore: 'lodash',
          components: './src/components',
          containers: './src/containers',
          redux: './src/redux',
          util: './src/util',
          styles: './src/styles',
          assets: './src/assets'
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
