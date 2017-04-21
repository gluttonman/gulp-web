/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../../libs/mapping")
class Manage extends Mapping{
    constructor(){
        super()
    }

    
    commonOwnJs(min = false){
        if(min){
            let manageConfig = this.Config.getJsTargetFilePath("manage")
            return Array.of(manageConfig)
        }else{
            let manageConfig = this.Config.getJsSourceFiles("manage")
            return Array.of(manageConfig)
        }
    }
    /*
     *
     **/
    commonThirdCss(min = false){
        if(min){
            let manageCommon = this.Config.getCssTargetFilePath("manage/manageCommon");
            let thickbox = this.Config.getCssTargetFilePath("thickbox/thickbox");
            let skins = this.Config.getCssTargetFilePath("skins/default");
            return Array.of(manageCommon,thickbox,skins);
        }else {
        	let manageCommon = this.Config.getCssSourceFiles("manage/manageCommon");
            let thickbox = this.Config.getCssSourceFiles("thickbox/thickbox");
            let skins = this.Config.getCssSourceFiles("skins/default");
            return Array.of(manageCommon,thickbox,skins);
        }
    }
}

module.exports = Manage