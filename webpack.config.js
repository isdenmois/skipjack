var webpack = require("webpack");

module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "app.js"
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
