/**
 * Created by Lijun on 2016/12/27.
 */


const SpaceMapping = require("../space-mapping")

class Member extends SpaceMapping {
    constructor() {
        super()
    }


    extraThirdJs(min = false) {
        let input,textArea
        if(min){
            textArea = this.Config.getJsTargetFilePath("ds-widget/dui-textarea")
            input = this.Config.getJsTargetFilePath("ds-widget/dui-input")
        }else{
            textArea = this.Config.getJsSourceFiles("ds-widget/dui-textarea")
            input = this.Config.getJsSourceFiles("ds-widget/dui-input")
        }
        return Array.of(textArea,input)
    }

    commonOwnJs(min = false){
        if(min){
            let spaceConfig = this.Config.getJsTargetFilePath("space/tools/spacePage")
            return Array.of(spaceConfig)
        }else{
            let spaceConfig = this.Config.getJsSourceFiles("space/tools/spacePage")
            return Array.of(spaceConfig)
        }
    }

    extraThirdCss(min = false) {
        if (min) {
            let thickbox = this.Config.getCssTargetFilePath("thickbox/thickbox.css")
            let fancybox = this.Config.getCssTargetFilePath("jquery/jquery.fancybox")
            let common = this.Config.getCssTargetFilePath("dsWidget/common")
            return Array.of(thickbox, fancybox, common)
        } else {
            let thickbox = this.Config.getCssSourceFiles("thickbox/thickbox.css")
            let fancybox = this.Config.getCssSourceFiles("jquery/jquery.fancybox")
            let common = this.Config.getCssSourceFiles("dsWidget/common")
            return Array.of(thickbox, fancybox, common)
        }
    }
}


module.exports = Member