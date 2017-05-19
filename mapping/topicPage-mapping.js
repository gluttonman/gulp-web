/**
 *
 * Created by Lijun on 2017/1/18.
 */

const Mapping = require("../libs/mapping")

class TopicPage extends Mapping{
    constructor(){
        super()
    }

    uniqueJs(min = false){
        let topicCss
        if(min){
            topicCss = this.Config.getSingle("web/topicPage")
        }else{
            topicCss = this.Config.getJsSourceFiles("web/topicPage")
        }
        return Array.of(topicCss)
    }

    extraThirdCss(min = false){
        let thinkbox, webCommon
        if(min){
            thinkbox = this.Config.getCssTargetFilePath("thickbox")
            webCommon  = this.Config.getCssTargetFilePath("web/common")
        }else{
            thinkbox = this.Config.getCssSourceFiles("thickbox")
            webCommon = this.Config.getCssSourceFiles("web/common")
        }
        return Array.of(thinkbox, webCommon)
    }

    uniqueCss(min = false){
        let topicCss
        if(min){
            topicCss = this.Config.getCssTargetFilePath("web/topicPage")
        }else{
            topicCss = this.Config.getCssSourceFiles("web/topicPage")
        }
        return Array.of(topicCss)
    }
}




module.exports = TopicPage