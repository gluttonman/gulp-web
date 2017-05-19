/**
 * Created by xus on 2016/12/30.
 */

const  Mapping = require("../manage-mapping")
class addArticle extends Mapping{
    constructor(){
        super()
    }
    
    extraThirdJs(min = false){
    	if(min){
    		let widget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
    		let uc = this.Config.getJsTargetFilePath("ueditor/ueditor.config")
    		let ua = this.Config.getJsTargetFilePath("ueditor/ueditor.all")
    		let kityformula = this.Config.getJsTargetFilePath("ueditor/kityformula-plugin/addKityFormulaDialog")
    		let getKfContent = this.Config.getJsTargetFilePath("ueditor/kityformula-plugin/getKfContent")
    		let defaultFilterFix = this.Config.getJsTargetFilePath("ueditor/kityformula-plugin/defaultFilterFix")
    		let dsWidgetInput = this.Config.getJsTargetFilePath("ds-widget/dui-input")
    		return Array.of(widget,uc,ua,kityformula,getKfContent,defaultFilterFix,dsWidgetInput)
    	}else{
    		let widget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
    		let uc = this.Config.getJsSourceFiles("ueditor/ueditor.config")
    		let ua = this.Config.getJsSourceFiles("ueditor/ueditor.all")
    		let kityformula = this.Config.getJsSourceFiles("ueditor/kityformula-plugin/addKityFormulaDialog")
    		let getKfContent = this.Config.getJsSourceFiles("ueditor/kityformula-plugin/getKfContent")
    		let defaultFilterFix = this.Config.getJsSourceFiles("ueditor/kityformula-plugin/defaultFilterFix")
            let dsWidgetInput = this.Config.getJsTargetFilePath("ds-widget/dui-input")
    		return Array.of(widget,uc,ua,kityformula,getKfContent,defaultFilterFix,dsWidgetInput)
    	}
    }
    
    commonOwnJs(min = false){
        if(min){
            let yptArticle = this.Config.getJsTargetFilePath("yptArticle")
            let shareRange = this.Config.getJsTargetFilePath("shareRange")
            return Array.of(yptArticle,shareRange)
        }else{
            let yptArticle = this.Config.getJsSourceFiles("yptArticle")
            let shareRange = this.Config.getJsSourceFiles("shareRange")
            return Array.of(yptArticle,shareRange)
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

module.exports = addArticle