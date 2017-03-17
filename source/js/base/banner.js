/**
 * Created by Lijun on 2016/12/8.
 */


function Banner(stageId, subjectId){
    this.stageId = stageId || 0;
    this.subjectId = subjectId || 0;
    this.ClassName ={
        4:{
            26: {"class":"xdxk-yw-ban","title":"小学语文"},
            38: {"class":"xdxk-pd-ban","title":"小学品德"},
            4: {"class":"xdxk-kx-ban","title":"小学科学"},
            3: {"class":"xdxk-yy-ban","title":"小学英语"},
            2: {"class":"xdxk-sx-ban","title":"小学数学"},
        },
        6:{
            91:{"class":"xdxk-xq-ban","title":"学前教育"}
        }
    }
}

Banner.prototype.replaceBanner =  function(id){
    if(this.stageId && this.subjectId){
        $("#"+id).addClass(this.ClassName[this.stageId][this.subjectId]["class"])
    }
}