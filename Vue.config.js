module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dataVisualization',
    // webpack配置
    chainWebpack: () => { },
    configureWebpack: () => { },
    productionSourceMap: true,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {},
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {//反向代理的方式解决跨域
            '/api': {
                target: 'http://localhost:4000'
            },
            '/uploads': {
                target: 'http://localhost:4000'
            }
        }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};