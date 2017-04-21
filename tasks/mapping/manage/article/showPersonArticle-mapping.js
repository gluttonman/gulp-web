/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../manage-mapping")
class ShowPersonArticle extends Mapping{
    constructor(){
        super()
    }
    
    extraThirdJs(min = false){
    	if(min){
    		let spacePage = this.Config.getJsTargetFilePath("space/tools/spacePage")
    		let spaceConfig = this.Config.getJsTargetFilePath("space/spaceConfig")
    		return Array.of(spacePage,spaceConfig)
    	}else{
    		let spacePage = this.Config.getJsSourceFiles("space/tools/spacePage")
    		let spaceConfig = this.Config.getJsSourceFiles("space/spaceConfig")
    		return Array.of(spacePage,spaceConfig)
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

module.exports = ShowPersonArticle