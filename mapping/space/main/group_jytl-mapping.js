/**
 * Created by Lijun on 2017/1/23.
 */


const SpaceMapping = require("../space-mapping")

class TL extends  SpaceMapping{
    constructor(){
        super()
    }

    extraThirdCss(min = false){
        let pager
        if(min){
            pager = this.Config.getCssTargetFilePath("page/pager.css")
        }else{
            pager = this.Config.getCssSourceFiles("page/pager.css")
        }
        return Array.of(pager)
    }

    extraThirdJs(min = false){
        let pager
        if(min){
            pager = this.Config.getJsTargetFilePath("page/pager.js")
        }else{
            pager = this.Config.getJsSourceFiles("page/pager.js")
        }
        return Array.of(pager)
    }
}


module.exports = TL