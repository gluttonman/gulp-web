/**
 * Created by Lijun on 2016/12/21.
 */

const Mapping = require("../../libs/mapping")

class SpaceMapping extends Mapping{
    constructor(){
        super()
        this.JsConfig = this.Config.JsConfig
        this.CssConfig = this.Config.CssConfig
        this.SpaceCssConfig = this.CssConfig["space"]
        this.SpaceJsConfig = this.JsConfig["space"]
    }

    extraThirdJs(min = false){
        let zTree,widget,search,fancybox
        if(min){
        	zTree = this.Config.getJsTargetFilePath("jquery/jquery.ztree.core-3.5")
        	widget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
            search = this.Config.getJsTargetFilePath("ds-widget/dui-search")
            ancybox = this.Config.getJsTargetFilePath("jquery/jquery.fancybox")
        }else{
        	zTree = this.Config.getJsSourceFiles("jquery/jquery.ztree.core-3.5")
        	widget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
            search = this.Config.getJsSourceFiles("ds-widget/dui-search")
            fancybox = this.Config.getJsSourceFiles("jquery/jquery.fancybox")
        }
        return Array.of(zTree,widget,search,fancybox)
    }

    commonOwnJs(min = false){
        let ownJs = []
        let spaceBaseJs = this.Config.JsConfig["space"]["base"]
        if(min){
            ownJs.push(spaceBaseJs["target"])
        }else{
            let sourceJs = spaceBaseJs["source"]
            ownJs = Object.keys(sourceJs).map((jsFile)=>{
                return sourceJs[jsFile]
            })

        }
        return ownJs
    }
    /*
    * 返回工作室需要的共用的第三方css
    * */
    commonThirdCss(min = false){
        if(min){
            let skins = this.Config.getCssTargetFilePath("skins")
            let loadSpaceCommon = this.Config.getCssTargetFilePath("space/loadSpaceCommon")
            let zTree = this.Config.getCssTargetFilePath("jquery/zTreeStyle")
            let thickbox = this.Config.getCssTargetFilePath("thickbox")
            let mainGroup = this.Config.getCssTargetFilePath("space/main_group")
            let uiCommon = this.Config.getCssTargetFilePath("dsWidget/common")
            return Array.of(skins, loadSpaceCommon, zTree,thickbox,mainGroup,uiCommon)
        }else {
            let skins = this.Config.getCssSourceFiles("skins")
            let loadSpaceCommon = this.Config.getCssSourceFiles("space/loadSpaceCommon")
            let zTree = this.Config.getCssSourceFiles("jquery/zTreeStyle")
            let thickbox = this.Config.getCssSourceFiles("thickbox")
            let mainGroup = this.Config.getCssSourceFiles("space/main_group")
            let uiCommon = this.Config.getCssSourceFiles("dsWidget/common")
            return Array.of(skins, loadSpaceCommon, zTree,thickbox,mainGroup,uiCommon)
        }
    }
}


module.exports = SpaceMapping