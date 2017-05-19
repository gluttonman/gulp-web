/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../manage-mapping")
class MokeManage extends Mapping{
    constructor(){
        super()
    }

    extraThirdJs(min = false){
        if(min){
            let newConfig = this.Config.getJsTargetFilePath("base/yptResource")
            let ztree = this.Config.getJsTargetFilePath("jquery/jquery.ztree.all-3.5")
            let excheck = this.Config.getJsTargetFilePath("jquery/jquery.ztree.excheck-3.5")
            let widget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
            let struc = this.Config.getJsTargetFilePath("ds-widget/dui-dropdown-struc")
            return Array.of(newConfig,ztree,excheck,widget,struc)
        }else{
            let newConfig = this.Config.getJsSourceFiles("base/yptResource")
            let ztree = this.Config.getJsSourceFiles("jquery/jquery.ztree.all-3.5")
            let excheck = this.Config.getJsSourceFiles("jquery/jquery.ztree.excheck-3.5")
            let widget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
            let struc = this.Config.getJsSourceFiles("ds-widget/dui-dropdown-struc")
            return Array.of(newConfig,ztree,excheck,widget,struc)
        }
    }
    extraThirdCss(min = false){
        if(min){
            let zTreeStyle = this.Config.getCssTargetFilePath("jquery/zTreeStyle")
            let common = this.Config.getCssTargetFilePath("dsWidget/common")
            let ztree = this.Config.getCssTargetFilePath("dsWidget/ztree")
            return Array.of(zTreeStyle,common,ztree)
        }else{
            let zTreeStyle = this.Config.getCssSourceFiles("jquery/zTreeStyle")
            let common = this.Config.getCssSourceFiles("dsWidget/common")
            let ztree = this.Config.getCssSourceFiles("dsWidget/ztree")
            return Array.of(zTreeStyle,common,ztree)
        }

    }

    uniqueJs(min = false) {
        let mokeEdit
        if (min) {
            mokeEdit = this.Config.getJsTargetFilePath("manage/moke/mokeEdit")
            return Array.of(mokeEdit)
        } else {
            mokeEdit = this.Config.getJsSourceFiles("manage/moke/mokeEdit")
            return Array.of(mokeEdit)
        }

    }
}

module.exports = MokeManage