const webpack = require('webpack');

module.exports = {
    /* ... other settings */
    transpileDependencies: ['vuex-module-decorators'],
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                plugins: [
                    new webpack.DefinePlugin({
                        PRODUCTION: JSON.stringify(true),
                        HTTPBASE: `'http://localhost:4004'`
                    })
                ]
            }
        } else {
            // 为开发环境修改配置...
            return {
                plugins: [
                    new webpack.DefinePlugin({
                        PRODUCTION: JSON.stringify(true),
                        HTTPBASE: `'http://localhost:4004'`
                    })
                ]
            }
        }
    }
}
