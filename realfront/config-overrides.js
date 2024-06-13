const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  })
);
