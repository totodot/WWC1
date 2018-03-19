const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
    devtool: "source-map",
    entry: ["./src/js/main.js", "./src/scss/main.scss"],
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                // HTML LOADER
                // Super important: We need to test for the html
                // as well as the nunjucks files
                test: /\.html$|njk|nunjucks/,
                use: [
                    "html-loader",
                    {
                        loader: "nunjucks-html-loader",
                        options: {
                            // Other super important. This will be the base
                            // directory in which webpack is going to find
                            // the layout and any other file index.njk is calling.
                            searchPaths: ["./src"]
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "WWC 1",
            template: "nunjucks-html-loader!./src/index.njk"
        }),
        new ExtractTextPlugin("styles.css")
    ]
};
