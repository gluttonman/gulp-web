/**
 * Created by thtf on 2016/10/27.
 */
'use strict'
const GulpWeb = require("./index.js")
const path = require("path")
console.info("gulp is running")

let WebConfig = GulpWeb.WebConfig

//key的名字就是文件夹的名字
let JsConfig = {
    bootstrap:{
        source : path.normalize(WebConfig.JS_SOURCE_PATH + "/bootstrap/bootstrap.js")
    },
    jquery: {
        target : path.normalize(WebConfig.JS_TARGET_PATH + "/jquery/jquery.min.js"),
        source :  {
            jquery : path.normalize(WebConfig.JS_SOURCE_PATH + "/jquery/jquery-1.12.4.js"),
            cookie : path.normalize(WebConfig.JS_SOURCE_PATH + "/jquery/jquery.cookie.js")
        }
    },
    space:{
      main:{
          main : {
              source : path.normalize(WebConfig.JS_SOURCE_PATH + "space/main/main.js")
          }
      }
    }
}

let CssConfig = {
    "bootstrap" : {
        source: path.normalize(WebConfig.CSS_SOURCE_PATH + "/bootstrap/bootstrap.css")
    }
}

WebConfig.addJsConfig(JsConfig)

WebConfig.addCssConfig(CssConfig)