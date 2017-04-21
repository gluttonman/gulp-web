/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../manage-mapping")
class mokeTjPage extends Mapping{
    constructor(){
        super()
    }

    extraThirdJs(min = false){
        if(min){
            let datePicker = this.Config.getJsTargetFilePath("datePicker/wdatePicker")
            return Array.of(datePicker)
        }else{
            let datePicker = this.Config.getJsSourceFiles("datePicker/wdatePicker")
            return Array.of(datePicker)
        }
    }
    /*
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
    */
}

module.exports = mokeTjPage