// const { defineConfig } = require('@vue/cli-service')
module.exports = {
    devServer:{
        allowedHosts: "all"
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}
