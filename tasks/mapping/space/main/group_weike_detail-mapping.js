/**
 * Created by Lijun on 2016/12/27.
 */
const SpaceMapping = require("../space-mapping")

class Weike_detail extends SpaceMapping {
    constructor() {
        super()
    }

    extraThirdJs(min = false){
        if(min){
            let yptResource = this.Config.getJsTargetFilePath("yptResource")
            return Array.of(yptResource)
        }else{
            let yptResource = this.Config.getJsSourceFiles("yptResource")
            return Array.of(yptResource)
        }
    }
    commonOwnJs(min = false) {
        if (min) {
            let newConfig = this.Config.getJsTargetFilePath("base/newConfig")
            return Array.of(newConfig)
        } else {
            let newConfig = this.Config.getJsSourceFiles("base/newConfig")
            return Array.of(newConfig)
        }
    }
    uniqueJs(min = false){
        if(min){
            let spacePage = this.Config.getJsTargetFilePath("space/tools/spacePage")
            let  weike = this.Config.getJsTargetFilePath("space/main/group_weike_detail")
            return Array.of(spacePage, weike)
        }else{
            let spacePage = this.Config.getJsSourceFiles("space/tools/spacePage")
            let  weike = this.Config.getJsSourceFiles("space/main/group_weike_detail")
            return Array.of(spacePage, weike)
        }
    }

    extraThirdCss(min = false){
        if(min){
            let uiCommon = this.Config.getCssTargetFilePath("dsWidget/common")
            let thickbox = this.Config.getCssTargetFilePath("thickbox/thickbox")
            let fancybox = this.Config.getCssTargetFilePath("fancybox")
            let resourceList = this.Config.getCssTargetFilePath("manage/resourceList")
            return Array.of(uiCommon,thickbox,fancybox,resourceList)
        }else{
            let uiCommon = this.Config.getCssSourceFiles("dsWidget/common")
            let thickbox = this.Config.getCssSourceFiles("thickbox/thickbox")
            let fancybox = this.Config.getCssSourceFiles("fancybox")
            let resourceList = this.Config.getCssSourceFiles("manage/resourceList")
            return Array.of(uiCommon,thickbox,fancybox,resourceList)
        }

    }
    uniqueCss(min = false) {
        if (min) {
            let mainGroup = this.Config.getCssTargetFilePath("space/main_group")
            let detail = this.Config.getCssSourceFiles("space/main/group_weike_detail")
            return Array.of(mainGroup,  detail)
        } else {
            let mainGroup = this.Config.getCssSourceFiles("space/main_group")
            let detail = this.Config.getCssSourceFiles("space/main/group_weike_detail")
            return Array.of(mainGroup,  detail)
        }
    }
}

module.exports = Weike_detail