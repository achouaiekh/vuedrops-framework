var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        "vuedrops-framework": './src/index.js',
        themes: './src/simple.styl'
    },

    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        libraryTarget: "umd",
        library: "VDCarousel",
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        stylus: 'vue-style-loader!css-loader!stylus-loader',
                    }
                }
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'stylus-loader'],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("themes.css")
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
