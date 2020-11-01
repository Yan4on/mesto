// postcss.config.js

// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    // подключите плагины к PostCSS
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
    },
};