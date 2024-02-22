const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
})
module.exports = {
    devServer: {
        port: 10000, //配置启动端口
        proxy: { //拦截器
            '/api': {
                target: "http://localhost:8080/",//代理目标地址linux服务器http://47.94.159.168:8080/ssm
                changeOrigin: true,//允许跨源
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        client: {
            //  解决页面弹出红色报错遮罩层,将overlay设置为false即可
            overlay: false
        },
    },

}