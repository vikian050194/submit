const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: ["./client/js/index.js", "./client/build.js"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                "eslint-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "url-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]",
                    outputPath: "fonts/",
                    publicPath: "fonts/"
                }
            },
            {
                test: /\.png$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(html)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "client", "build")
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
};