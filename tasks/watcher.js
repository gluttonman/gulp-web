/**
 * Created by Lijun on 2016/11/16.
 */


const gulp = require("gulp")
const Task = require("./libs/task")
const exec = require("child_process").exec
const dateFormat = require("dateformat")
gulp.task("watcher", function (finish) {
    let task = new Task()
    let htmlPath = (task.Config.HTML_SOURCE_PATH+ "/**/*.html").replace("./","");
    let notWatherHtml = (task.Config.ROOT + "/common/**/*.html").replace("./","")
    let jsPath = (task.Config.JS_SOURCE_PATH +"/**/*.js").replace("./","")
    let cssPath = (task.Config.CSS_SOURCE_PATH + "/**/*.css").replace("./","")
    let watcher = gulp.watch([htmlPath,jsPath,notWatherHtml, cssPath])
    watcher.on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            if(event.type == 'deleted'){
                return
            }
            let path = event.path
            if (path.indexOf("html") > 0) {
                if(path.indexOf("common")>0){
                    console.info(dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),path)
                    exec("gulp tpl-all")
                }else{
                    let relativePath = path.substring(path.indexOf("html")+5,path.length)
                    console.info(dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),relativePath)
                    exec("gulp tpl --dir "+ relativePath)
                }

            } else if(path.indexOf("js")>0){
                let relativePath = path.substring(path.indexOf("js")+3,path.length)
                console.info(dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),relativePath)
                exec("gulp uglify-js --dir " + relativePath)
            } else if(path.indexOf("css")>0){
                let relativePath = path.substring(path.indexOf("css")+4,path.length)
                console.info(dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),relativePath)
                exec("gulp uglify-css --dir " + relativePath)
            } else {
                console.info("未找到文件类型")
            }
        })
})

