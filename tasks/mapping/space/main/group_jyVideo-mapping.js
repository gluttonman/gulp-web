/**
 *
 * Created by Lijun on 2016/12/24.
 */
const SpaceMapping = require("../space-mapping")
const path = require("path")
class Video extends SpaceMapping{
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
            return Array.of(zTree, fancybox, uiWidget, uiSearch,input, pageConfig)
        }else{
            let zTree = this.Config.getJsSourceFiles("jquery/jquery-ztree-all-3.5")
            let fancybox = this.Config.getJsSourceFiles("jquery/jquery.fancybox")
            let uiWidget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
            let uiSearch = this.Config.getJsSourceFiles("ds-widget/dui-search")
            let input = this.Config.getJsSourceFiles("ds-widget/dui-input")
            let pageConfig = this.Config.getJsSourceFiles("space/tools/spacePage")
            return Array.of(zTree, fancybox, uiWidget, uiSearch, input,pageConfig)
        }
    }

    extraThirdCss(min = false){
        if(min){
            let ztreeStyle = this.Config.getCssTargetFilePath("jquery/zTreeStyle")
            let uiCommon = this.Config.getCssTargetFilePath("dsWidget/common")
            let mainGroup = this.Config.getCssTargetFilePath("space/main_group")
            let fancybox = this.Config.getCssTargetFilePath("fancybox")
            return Array.of(ztreeStyle, uiCommon, mainGroup,fancybox)
        }else{
            let ztreeStyle = this.Config.getCssSourceFiles("jquery/zTreeStyle")
            let uiCommon = this.Config.getCssSourceFiles("dsWidget/common")
            let mainGroup = this.Config.getCssSourceFiles("space/main_group")
            let fancybox = this.Config.getCssSourceFiles("fancybox")
            return Array.of(ztreeStyle, uiCommon, mainGroup,fancybox)
        }
    }
}


module.exports = Video