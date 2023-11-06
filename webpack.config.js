const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProductionMode = argv.mode === 'production';

    return {
        entry: ['./src/main.js'],
        mode: isProductionMode ? 'production' : 'development',
        devtool: isProductionMode ? 'source-map' : 'eval-source-map',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
            filename: 'app.js',
            libraryTarget: 'amd',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.vue'],
        },
        plugins: [
            new VueLoaderPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'src/static'), to: '' }
                ],
            }),
        ],
        optimization: {
            'minimize': true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    compress: {
                        pure_funcs: [
                            'console.log',
                            'console.info',
                            'console.debug',
                            'console.warn',
                            'console.error',
                        ]
                    }
                }
            })],
        },
    };
};
