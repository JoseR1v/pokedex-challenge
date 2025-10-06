module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isTest = api.env('test');
  const presets = isTest
    ? [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      ]
    : [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
        'nativewind/babel',
      ];

  const plugins = [
    'react-native-reanimated/plugin',
  ].filter(Boolean);

  return { presets, plugins };
};
