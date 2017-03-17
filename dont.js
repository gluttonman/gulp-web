/**
 * Created by Lijun on 2016/12/16.
 */

/*
const path = require("path")

let array = [1,2,3,4]

console.info(...array)

console.info(path.normalize("/dd\\jd/edit.html"))
console.info(path.sep)*/

let path =  "hd/edit.html"

//let reg = new RegExp(/\/\w*.html/)
path = path.replace(/\/\w*\.html/, "")

console.info(path)
