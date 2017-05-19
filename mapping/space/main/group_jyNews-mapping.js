/**
 * Created by Lijun on 2016/12/27.
 */
const SpaceMapping = require("../space-mapping")

class News extends SpaceMapping {
    constructor() {
        super()
    }

    extraThirdJs(min = false){
        if(min){
            let config = this.Config.getJsTargetFilePath("ueditor/ueditor.config")
            let all = this.Config.getJsTargetFilePath("ueditor/ueditor.all")
            return Array.of(config, all)
        }else{
            let config = this.Config.getJsSourceFiles("ueditor/ueditor.config")
            let all = this.Config.getJsSourceFiles("ueditor/ueditor.all")
            return Array.of(config, all)
        }
    }
}

module.exports = News