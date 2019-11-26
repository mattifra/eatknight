// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');
  },
  pluginOptions: {
    svgSprite: {
        dir: 'src/assets/icons',
        test: /\.(svg)(\?.*)?$/,
        loaderOptions: {
            extract: true,
            spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
        },
        pluginOptions: {
            plainSprite: true
        }    
    }    
}    
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/abstracts/*')
      ],
    })
}