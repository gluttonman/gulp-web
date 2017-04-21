/**
 * Created by Lijun on 2016/12/27.
 */

const SpaceMapping = require("../space-mapping")

class JyRes extends SpaceMapping{
    constructor(){
        super()
    }

    extraThirdJs(min = false){
        if(min){
            let zTree = this.Config.getJsTargetFilePath("jquery/jquery-ztree-all-3.5")
            let fancybox = this.Config.getJsTargetFilePath("jquery/jquery.fancybox")
            let uiWidget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
            let uiSearch = this.Config.getJsTargetFilePath("ds-widget/dui-search")
            let input = this.Config.getJsTargetFilePath("ds-widget/dui-input")
            let pageConfig = this.Config.getJsTargetFilePath("space/tools/spacePage")
            let yptResource = this.Config.getJsTargetFilePath("yptResource")
            return Array.of(zTree, fancybox, uiWidget, uiSearch,input, pageConfig,yptResource)
        }else{
            let zTree = this.Config.getJsSourceFiles("jquery/jquery-ztree-all-3.5")
            let fancybox = this.Config.getJsSourceFiles("jquery/jquery.fancybox")
            let uiWidget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
            let uiSearch = this.Config.getJsSourceFiles("ds-widget/dui-search")
            let input = this.Config.getJsSourceFiles("ds-widget/dui-input")
            let pageConfig = this.Config.getJsSourceFiles("space/tools/spacePage")
            let yptResource = this.Config.getJsSourceFiles("yptResource")
            return Array.of(zTree, fancybox, uiWidget, uiSearch, input,pageConfig,yptResource)
        }
    }

    extraThirdCss(min = false){
        if(min){
            let ztreeStyle = this.Config.getCssTargetFilePath("jquery/zTreeStyle")
            
            let fancybox = this.Config.getCssTargetFilePath("fancybox")
            return Array.of(ztreeStyle, fancybox)
        }else{
            let ztreeStyle = this.Config.getCssSourceFiles("jquery/zTreeStyle")
            let fancybox = this.Config.getCssSourceFiles("fancybox")
            return Array.of(ztreeStyle, fancybox)
        }
    }
}


module.exports = JyRes