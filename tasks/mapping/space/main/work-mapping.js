/**
 * Created by Lijun on 2016/12/21.
 */

const SpaceMapping = require("../space-mapping.js")
const path = require("path")
class WorkMapping extends SpaceMapping {
    constructor(){
        super()
    }

    extraThirdJs(min = false){
        let JsConfig = this.Config.JsConfig
        if(min){
            let jqueryFancybox = this.Config.getJsTargetFilePath("jquery/jquery.fancybox")
            let jqueryPortletlazyload = this.Config.getJsTargetFilePath("jquery/jquery.portletlazyload")
            let jqueryIView = this.Config.getJsTargetFilePath("jquery/jquery.iview")
            let widget = this.Config.getJsTargetFilePath("ds-widget/jquery-ui-widget")
            let textarea = this.Config.getJsTargetFilePath("ds-widget/dui-textarea")
            return Array.of(jqueryFancybox, jqueryPortletlazyload,jqueryIView,widget,textarea)
        }else{
            let jqueryFancybox = this.Config.getJsSourceFiles("jquery/jquery.fancybox")
            let jqueryPortletlazyload = this.Config.getJsSourceFiles("jquery/jquery.portletlazyload")
            let jqueryIView = this.Config.getJsSourceFiles("jquery/jquery.iview")
            let widget = this.Config.getJsSourceFiles("ds-widget/jquery-ui-widget")
            let textarea = this.Config.getJsSourceFiles("ds-widget/dui-textarea")
            return Array.of(jqueryFancybox, jqueryPortletlazyload,jqueryIView,widget,textarea)
        }
    }

    uniqueCss(min = false){
        if(min){
            let mainCss = this.SpaceCssConfig["main"]["source"].replace(".css",".min.css").replace("source"+path.sep,"")
            return Array.of(mainCss)
        }else{
            let mainCss = this.SpaceCssConfig["main"]["source"]
            return Array.of(mainCss)
        }
    }
}


module.exports = WorkMapping