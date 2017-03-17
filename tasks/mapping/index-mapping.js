/**
 * Created by Lijun on 2016/12/16.
 */



const BaseMapping = require("../libs/mapping")
const path = require("path")
class IndexMapping extends BaseMapping{
    constructor(){
        super()
    }

    extraThirdJs(min = false){
        if(min){
            return [this.Config.JS_TARGET_PATH + path.normalize("/jquery/jquery.ztree.all-3.5.min.js")]
        }else{
            return [this.Config.JS_SOURCE_PATH + path.normalize("/jquery/jquery.ztree.all-3.5.js")]
        }
    }

    extraThirdCss(min = false){

    }
}


module.exports = IndexMapping