// webpack.config.js
const path = require('path');

module.exports = {
    entry: {
        'popup': ['./src/popup/script.ts', './src/popup/ui.ts'],
        'inserted/get': './src/inserted/get.ts',
        'inserted/insert': './src/inserted/insert.ts',
        'inserted/clear': './src/inserted/clear.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build/js'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    mode: 'production',
};
