/**
 * Created by thtf on 2016/10/27.
 */
'use strict'
const path = require("path")
class Config{
    constructor(source){
        throw new Error("Config.class is not new")
        return null
    }
}
//相对路径
let relativePath = Config.RELATIVE_PATH = "." + path.sep
//源文件目录位置
Config.SOURCEDIR = relativePath + "source"
Config.HTML_SOURCE_PATH =  Config.SOURCEDIR + path.sep + "html"
Config.HTML_TARGET_PATH =  relativePath +  "html"
Config.JS_SOURCE_PATH = Config.SOURCEDIR + path.sep + "js"
Config.JS_TARGET_PATH = relativePath +  "js"
Config.CSS_SOURCE_PATH = Config.SOURCEDIR + path.sep + "css"
Config.CSS_TARGET_PATH = relativePath +  "css"
//配置第三方共用的js，css文件
Config.thirdJsKeys = ["jquery","bootstrap"]
Config.thirdCssKeys = ["bootstrap"]

//配置自己开发的，共用的js，css文件
Config.ownJsKeys = ["base"]
Config.ownCssKeys = []

//返回target js文件或者source文件公用方法

Config.getJsTargetFilePath = function(dir){
    return this.getTargetFilePath(this.JsConfig, dir)
}

Config.getCssTargetFilePath = function(dir){
    return this.getTargetFilePath(this.CssConfig, dir)
}
Config.getTargetFilePath = function (config, filename) {
    if(!filename){
        throw new Error("filename is not null")
        return ""
    }
    let filePath = filename
    if(filePath.endsWith(".js") || filePath.endsWith(".css")){
        filePath = filename.substring(0, filename.lastIndexOf("."))
    }

    let dirs = path.normalize(filePath).split(path.sep)
    let fileConfig = config
    dirs.forEach((item, index)=>{
        fileConfig = fileConfig[item]
        if(!fileConfig){
            return Object.is(config,this.JsConfig)?this.fetchJsSingleFile(filePath, true):this.fetchCssSingleFile(filePath, true)
        }
    })
    let sourceFileToTarget = (sourceFileConfig)=>{
        if(!sourceFileConfig || !Object.keys(sourceFileConfig).includes("source") || typeof sourceFileConfig["source"] != "string"){
            console.warn("Config中["+filePath+"]['source'] is not string")
            return Object.is(config,this.JsConfig)?this.fetchJsSingleFile(filePath, true):this.fetchCssSingleFile(filePath, true)
        }
        let sourceFile = sourceFileConfig["source"]
        return Object.is(config, this.JsConfig)?sourceFile.replace(".js",".min.js").replace("source"+path.sep,""):sourceFile.replace(".css",".min.css").replace("source"+path.sep,"")
    }
    return fileConfig && fileConfig["target"]?fileConfig["target"]:sourceFileToTarget(fileConfig)
}


Config.getJsSourceFiles = function(dir){
    return this.getSourceFiles(this.JsConfig, dir)
}

Config.getCssSourceFiles = function(dir){
    return this.getSourceFiles(this.CssConfig, dir)
}

Config.getSourceFiles = function(config, filename){
    if(!filename){
        throw new Error("dir is not null")
        return ""
    }
    let filePath = filename
    if(filePath.endsWith(".js") || filePath.endsWith(".css")){
        filePath = filename.substring(0, filename.lastIndexOf("."))
    }

    let dirs = path.normalize(filePath).split(path.sep)
    let fileConfig = config
    let singleFile
    dirs.forEach((item, index)=>{
        //判断是不是当前需要注入的文件名称，如果是则加载这个页面独有的js，如果不是则不加载。bug jquery/jquery.ztree.core如果没有的时候会加载jquery的源文件
        if(!fileConfig || !Object.keys(fileConfig).includes(item)){
            let argvs = process.argv
            let inFileName = argvs[argvs.indexOf("--dir")+1]
            let inFilePath = inFileName.substring(0,inFileName.lastIndexOf("."))
            if(inFilePath.endsWith(item)){
                singleFile = Object.is(config,this.JsConfig)?this.fetchJsSingleFile(filename, false):this.fetchCssSingleFile(filename, false)
            }
        }
        fileConfig = fileConfig[item]
    })

    if(singleFile){//返回页面独有的js文件
        return singleFile
    }
    let dealSourceFileToArray = ()=>{
        if(fileConfig && Object.keys(fileConfig).includes("source")){//包含source字段，肯定是个对象，遍历对象返回value数组
            return Object.keys(fileConfig["source"]).map(function(key){
                return fileConfig["source"][key]
            })
        }else{
            return Object.is(config, this.JsConfig)?this.fetchJsSingleFile(filename,false):this.fetchCssSingleFile(filename, false)
        }

    }
    return fileConfig && fileConfig["source"] &&  typeof fileConfig["source"] == 'string'?fileConfig["source"]:dealSourceFileToArray()
}


Config.fetchJsFilesPath = function (files, min = false){
    let commonJS = []
    files.forEach((key,item)=>{
        if(min){
            commonJS.push(this.getJsTargetFilePath(key))
        }else{
            let sourceFiles = this.getJsSourceFiles(key)
            typeof sourceFiles == "string" ? commonJS.push(sourceFiles) : commonJS=commonJS.concat(sourceFiles)
        }
    })
    return commonJS
}


Config.fetchCssFilesPath = function (files, min = false){
    let commonCss = []
    files.forEach((key,item)=>{
        if(min){
            commonCss.push(this.getCssTargetFilePath(key))
        }else{
            let sourceFiles = this.getCssSourceFiles(key)
            typeof sourceFiles == "string" ? commonCss.push(sourceFiles) : commonCss=commonCss.concat(sourceFiles)
        }
    })
    return commonCss
}

Config.fetchJsSingleFile = function(filePath, min= false){
    if(!filePath.endsWith(".js")){
        filePath +=".js"
    }
    if(min){
        return path.normalize(this.JS_TARGET_PATH + path.sep +  filePath.replace(".js", ".min.js"))
    }else{
        return path.normalize(this.JS_SOURCE_PATH + path.sep + filePath)
    }
}

Config.fetchCssSingleFile = function(filePath, min = false){
    if(!filePath.endsWith(".css")){
        filePath +=".css"
    }
    if(min){
        return path.normalize(this.CSS_TARGET_PATH + path.sep +  filePath.replace(".css", ".min.css"))
    }else{
        return path.normalize(this.CSS_SOURCE_PATH + path.sep + filePath)
    }
}


//key的名字就是文件夹的名字
Config.JsConfig = {
    jquery :{
        target : path.normalize(Config.JS_TARGET_PATH + "/jquery/jquery.min.js"),//如果没有此熟悉，就默认到项目根目录的jquery/jquery-1.12.4.min.js,
        source:{
            jquery : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery-1.7.2.js"),
            cookie : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.cookie.js")
        },
        "jquery.lazyload":{
            source : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.lazyload.js")
        },
        "jquery.fancybox" : {
            source:path.normalize(Config.JS_SOURCE_PATH +"/jquery/jquery.fancybox.js")
        },
        "jquery.portletlazyload" : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.portletlazyload.js")
        },
        "jquery.iview" :{
            source : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.iview.js")
        },
        "jquery.ztree.all-3.5":{
            source : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.ztree.all-3.5.js")
        },
        "jquery.ztree.excheck-3.5":{
        	source : path.normalize(Config.JS_SOURCE_PATH + "/jquery/jquery.ztree.excheck-3.5.js")
        }
    },
    yptArticle : {
    	source : path.normalize(Config.JS_SOURCE_PATH + "/article/yptArticle.js")
    },
    yptResource : {
    	source : path.normalize(Config.JS_SOURCE_PATH + "/resource/yptResource.js")
    },
    shareRange : {
    	source : path.normalize(Config.JS_SOURCE_PATH + "/resource/dui-share-range.js")
    },
    bootstrap:{
        source : path.normalize(Config.JS_SOURCE_PATH + "/bootstrap/bootstrap-3.0.3.js")
    },
    base :{
        target : path.normalize(Config.JS_TARGET_PATH + "/base/base.min.js"),
        source : {
            template: path.normalize(Config.JS_SOURCE_PATH +"/base/template.js"),
            base64 : path.normalize(Config.JS_SOURCE_PATH + "/base/base64.js"),
            artDialog : path.normalize(Config.JS_SOURCE_PATH + "/base/artDialog.js"),
            thickbox : path.normalize(Config.JS_SOURCE_PATH + "/base/thickbox.js"),
            iframeTools : path.normalize(Config.JS_SOURCE_PATH + "/base/iframeTools.js"),
            baseConfig : path.normalize(Config.JS_SOURCE_PATH + "/base/base-config.js"),
            newConfig : path.normalize(Config.JS_SOURCE_PATH + "/base/newConfig.js")
        }
    },
    manage :{
    	source : path.normalize(Config.JS_SOURCE_PATH + "/manage/manageConfig.js")
    },
    "ds-widget" : {
        "jquery-ui-widget" :{
           source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/jquery-ui-widget.js")
        },
        "dui-search" :{
            source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/dui-search.js")
        },
        "dui-input" : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/dui-input.js")
        },
        "dui-textarea" : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/dui-textarea.js")
        },
        "plupload-parent-common":{
            source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/plupload-parent-common.js")
        },
        "dui-dropdown-struc":{
            source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/dui-dropdown-struc.js")
        },
        "dui-autocomplete":{
        	source : path.normalize(Config.JS_SOURCE_PATH + "/ds-widget/dui-autocomplete.js")
        }
    },
    "ueditor" : {
        "ueditor.config": {
            source: path.normalize(Config.JS_SOURCE_PATH + "/ueditor/ueditor.config.js")
        },
        "ueditor.all" : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/ueditor/ueditor.all.js")
        },
        "kityformula-plugin" : {
            "addKityFormulaDialog":{
                source: path.normalize(Config.JS_SOURCE_PATH + "/ueditor/kityformula-plugin/addKityFormulaDialog.js")
            },
            "getKfContent":{
                source : path.normalize(Config.JS_SOURCE_PATH + "/ueditor/kityformula-plugin/getKfContent.js")
            },
            "defaultFilterFix": {
                source : path.normalize(Config.JS_SOURCE_PATH + "/ueditor/kityformula-plugin/defaultFilterFix.js")
            }
        }
    },
    "datePicker" : {
        "wdatePicker": {
            source: path.normalize(Config.JS_SOURCE_PATH + "/datepicker/WdatePicker.js")
        }
    },
    "IEWdatePicker" : {
        "wdatePicker": {
            source: path.normalize(Config.JS_SOURCE_PATH + "/datepicker/IEWdatePicker.js")
        }
    },
    "page":{
        "pager" : {
            source: path.normalize(Config.JS_SOURCE_PATH + "/page/pager.js")
        }
    },
    space : {
        base : {
            target : path.normalize(Config.JS_TARGET_PATH + "/space/spaceBase.min.js"),
            source : {
                xss : path.normalize(Config.JS_SOURCE_PATH + "/space/xss.js"),
                org_common : path.normalize(Config.JS_SOURCE_PATH + "/space/main/org_common.js"),
                loadTemplates : path.normalize(Config.JS_SOURCE_PATH + "/space/tools/loadTemplates.js"),
                spaceConfig : path.normalize(Config.JS_SOURCE_PATH + "/space/space-config.js"),
                mainLogin : path.normalize(Config.JS_SOURCE_PATH + "/space/main_login.js"),
                loadSpaceCommon : path.normalize(Config.JS_SOURCE_PATH + "/space/loadSpaceCommon.js")
            }
        },
        main : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/space/main/org_main.js")
        },
        tools : {
            spacePage : {
                source : path.normalize(Config.JS_SOURCE_PATH + "/space/tools/spacePage.js")
            },
            moment : {
                source : path.normalize(Config.JS_SOURCE_PATH + "/space/tools/moment.js")
            }
        },
        spaceConfig : {
            source : path.normalize(Config.JS_SOURCE_PATH + "/space/space-config.js")
        }
    }
}


Config.CssConfig = {
    "jquery" :{
        zTreeStyle : {
            source: path.normalize(Config.CSS_SOURCE_PATH + "/jquery/zTreeStyle.css")
        }
    },
    "bootstrap" : {
        source: path.normalize(Config.CSS_SOURCE_PATH + "/bootstrap/bootstrap.css")
    },
    "skins":{
        source: path.normalize(Config.CSS_SOURCE_PATH + "/skins/default.css")
    },
    "thickbox" :{
        source : path.normalize(Config.CSS_SOURCE_PATH + "/thickbox/thickbox.css")
    },
    "fancybox":{
        source : path.normalize(Config.CSS_SOURCE_PATH + "/jquery/jquery.fancybox.css")
    },
    "dsWidget":{
        common :{
            source : path.normalize(Config.CSS_SOURCE_PATH + "/ds-widget/dui-common.css")
        },
        ztree : {
            source : path.normalize(Config.CSS_SOURCE_PATH + "/ds-widget/dui-ztree.css")
        }
    },
    page : {
        pager : path.normalize(Config.CSS_SOURCE_PATH + "/page/pager.css")
    },
    //space使用样式
    space :{
        "main" :{
            source: path.normalize(Config.CSS_SOURCE_PATH + "/space/main.css")
        },
        "loadSpaceCommon" :{
            source: path.normalize(Config.CSS_SOURCE_PATH + "/space/loadSpaceCommon.css")
        },
        "space_article_pages":{
            source: path.normalize(Config.CSS_SOURCE_PATH + "/space/space_article_pages.css")
        },
        "main_group" : {
            source : path.normalize(Config.CSS_SOURCE_PATH + "/space/main_group.css")
        }
    },
    web : {
      common : {
          source : path.normalize(Config.CSS_SOURCE_PATH + "/web/common.css")
      }
    },
    manage :{
        "manageCommon" :{
            source: path.normalize(Config.CSS_SOURCE_PATH + "/manage/manageCommon.css")
        },
        "resourceList" :{
            source: path.normalize(Config.CSS_SOURCE_PATH + "/manage/resource/resourceList.css")
        }
    }
}


module.exports = Config