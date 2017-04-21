/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../manage-mapping")
class ArticlePage extends Mapping{
    constructor(){
        super()
    }
    
    extraThirdJs(min = false){
    	if(min){
    		let widget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
    		let autocomplete = this.Config.getJsTargetFilePath("ds-widget/dui-autocomplete")
    		return Array.of(widget,autocomplete)
    	}else{
    		let widget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
    		let autocomplete = this.Config.getJsSourceFiles("ds-widget/dui-autocomplete")
    		return Array.of(widget,autocomplete)
    	}
    }
    
    commonOwnJs(min = false){
        if(min){
            let yptArticle = this.Config.getJsTargetFilePath("yptArticle")
            return Array.of(yptArticle)
        }else{
            let yptArticle = this.Config.getJsSourceFiles("yptArticle")
            return Array.of(yptArticle)
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

module.exports = ArticlePage