const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const path = require("path");

module.exports = withPlugins([[withImages]], {
    images: {
        disableStaticImages: true,
    },
    webpack(config, options) {
        config.resolve.modules.push(path.resolve("./"));
        config.resolve.fallback = {
            child_process: false,
            fs: false,
            crypto: require.resolve("crypto-browserify"),
            os: require.resolve("os-browserify/browser"),
            tty: require.resolve("tty-browserify"),
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
            http: require.resolve("stream-http")
        }
        return config;
    },
});
