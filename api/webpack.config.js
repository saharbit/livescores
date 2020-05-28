const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
        ],
    },
    mode: "production",
};
