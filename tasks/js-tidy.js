/**
 * Created by thtf on 2016/10/27.
 */
const gulp = require("gulp")
const concat = require("gulp-concat")
const rename = require("gulp-rename")
const uglify = require("gulp-uglify")
const Task = require("./libs/task")
const path = require("path")
const exec = require("child_process").exec

/*
* 压缩单独的js文件
* TestCommand : gulp uglify-js --path jh/jhAdd.js
* 操作本页面独有的js文件,不执行合并操作
*
* */
gulp.task("uglify-js", function (finish) {
    const argv = require("yargs")
        .require("dir")
        .argv;
    let dir = path.normalize(argv.dir)
    let task = new Task()
    let sourceJs = task.jsSourceFiles(dir,false)
    let targetPath = task.jsTargetPath(dir)
    let minName = task.jsMinName(dir)
    console.info("sourceJs>>>>>>", sourceJs, "targetPath>>>>>>", targetPath, "minName>>>>>>", minName)
    return gulp.src(sourceJs)
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(rename(minName))
        .pipe(gulp.dest(targetPath))
})

/**
 * 执行Config.JSconfig中的所有js文件的压缩
 */
gulp.task("uglify-jsconfig", function(){
    let task = new Task()
    let jsConfig = task.Config.JsConfig
    for(let jsFileName in jsConfig){
        console.info(jsConfig[jsFileName])
        exec("gulp uglify-js --dir " + jsFileName)
    }
})
