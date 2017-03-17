function showVideoInfo(title,href){
  tb_show("当前视频："+title,href + "&TB_iframe=true&height=520&width=820","thickbox");
}

function showResourceInfo(title,href){
	var str = "";
	if(href.indexOf("?") > 0){
		str = "&";
	}else{
		str = "?";
	}
	tb_show("当前资源："+title,href + str + "TB_iframe=true&height=520&width=820","thickbox");
}

function showResourceById(title,id){
	var href = url_path_html + "/yx/html/showYptNsResource.html?id=" + id + "&t=" + Math.random();
	//tb_show("当前资源："+title,href + "&TB_iframe=true&height=520&width=820","thickbox");
	art.dialog.open(href, {
		title: title,
		height: 550,
	    width: 850,
	    zIndex:9999,
	    lock:true
	});
}


function openResourcePage(url){
	window.open(url_path_html + "/yx/html/showResource.html?u=" + url);
	
}

function render_resourcePage(data,serviceName){
  if(null != data.list && data.list.length > 0){
	  data = addServerUrlToJson(data);
	  upDataToJson(data,1);
	  beforeRender(data);
	  var person_id_ = $.cookie("person_id");
	  for(var i = 0; i < data.list.length;i++){
	    //检测资源所有人是不是自己
	    if(data.list[i].person_id == person_id_){
	      data.list[i].is_mine = true;
	    }else{
	      data.list[i].is_mine = false;
	    }
	  }
	  if(undefined != $.cookie("person_id") && "null" != $.cookie("person_id")){
		  data.isLogin = true;
	  }else{
		  data.isLogin = false;
	  }
  }
  
  var html = template(serviceName + 'Page_template', data);
  $("#"+ serviceName + "Page_content").html(html);
}

//显示功能
function showResOperation(iid){
  $("#resBtn_"+iid).css("display","block");
  $("#m_"+iid).mouseover(function(){  
        $(this).show();  
    }).mouseout(function() {  
        $("#resBtn_"+iid).hide();  
        $(this).hide();
    }); 
}

//功能隐藏
function hideResOperation(iid){
  $("#addResBag_"+iid).css("display","none");
  $("#resBtn_"+iid).css("display","none");
  $("#addResZy_"+iid).css("display","none");
  
}

//显示下拉功能
function dropdownShow(id){            
   var btn_down = $("#" + id).offset().top + $("#" + id).height();
     var q_down = $("#business_content").offset().top + $("#business_content").height();
     var menu_height = q_down - btn_down - 20;

     var m_height = $(".r-menu").height();
     if(m_height == 0){
      m_height = 116;
     }
     
     if(menu_height < m_height){
         $("#" + id ).next().removeClass("dropdown-menu");
         $("#" + id ).next().addClass("dropup-menu");
     }else{
         $("#" + id ).next().removeClass("dropup-menu");
         $("#" + id ).next().addClass("dropdown-menu");
     }
      
     $(".dropdown-menu r-menu").css("display","none");
     var m_btn = id.substring(4);
     var m_btn_display = $("#m_"+m_btn).css("display");
     if(m_btn_display == "none"){
      $("#m_"+m_btn).css("display","block");
  }else{
    $("#m_"+m_btn).css("display","none");
  }   
}


//=====11-19jyy=====处理返回数据（预览以及下载地址等）
function upDataToJson(json_tem,type) {
  var path_m = STATIC_IMAGE_PRE + "down/Material/";
  var path_thumb = url_path_down + "down/Thumbs/";
  //是否为名师
  var is_teacher = self.parent.g_is_teacher;
  json_tem["is_teacher"] = is_teacher;

  //是否是区域均衡
  var is_qyjh = self.parent.g_is_qyjh;
  json_tem["is_qyjh"] = is_qyjh;
  //若在我的大学区下   鼠标移动到资源上面，展示 资源所属活动和协作体名称
  if($("#view_id_hid").val() == 9){
    json_tem["show_qyjh"] = 1;
  }else{
    json_tem["show_qyjh"] = 0;
  }

  var list = new Array();
  $.each(json_tem.list,function(i,n){
        var r_format = n.resource_format;
        var file_id = n.file_id;
        
        if(undefined == n.url_code){
        	n.url_code = encodeURI(n.resource_title);
        }
        
            var _id = path_m + file_id.substring(0,2) + "/" + file_id + "." + r_format + "?flag=download&n=" + n.url_code + "." + r_format;
            var _class = "";
            var _title = n.resource_title + '.' + r_format;
            var _href = "";
            var _i = i;
            var thumbtwo_id = n.thumb_id;
            var _file_path_thumb = path_thumb + thumbtwo_id.substring(0,2) + "/" + thumbtwo_id + ".thumb";
            var resource_page = n.resource_page;

            //===============处理预览方式=============
            //参数：file_ext，file_id，file_title，file_page，_width，_height，p_status，p_type
            var f_json = 
            {
              "file_ext":r_format,
              "file_id":file_id,
              "file_title":n.resource_title,
              "file_page":resource_page,
              "_width":n.width,
              "_height":n.height,
              "p_status":n.preview_status,
              "p_type":1
            };
            //返回预览所需参数
            var p_json = dealPreviewFun(f_json);
            _class = p_json._class;
                _href = p_json._href;
                _title = p_json._title;
            
                //===============处理下载方式=============
          //参数：（file_id，file_ext，for_urlencoder_url，for_iso_url，url_code）
          var _json = 
          {
            "file_id":file_id,
            "file_ext":r_format,
            "for_urlencoder_url":n.for_urlencoder_url,
            "for_iso_url":n.for_iso_url,
            "url_code":n.url_code
          };
          var _down_path = dealDownpathFun(_json);
            var _khd_down_path_hou =  "filename="+n.resource_title+"."+r_format+",url="+path_m + file_id.substring(0,2) + "/" + file_id + "." + r_format;
            var _khd_down_path =  "dsoneres://"+Base64.encode(_khd_down_path_hou);
          
          
          //alert("_khd_down_path==="+_khd_down_path);
          json_tem.list[i]["down_path"] = _down_path;
          json_tem.list[i]["khd_down_path"] = _khd_down_path;
          
        
        if(type == 2){
          //我的资源
          var myres_source = "";
                if(n.type_id == 1){
                  myres_source = "我的收藏";
              }else if(n.type_id == 2){
                myres_source = "我推荐的资源";
              }else if(n.type_id == 3){
                myres_source = "推荐给我的资源";
              }else if(n.type_id == 4){
                myres_source = "我的评论";
              }else if(n.type_id == 5){
                myres_source = "我的反馈";
              }else if(n.type_id == 6){
                myres_source = "我的上传";
              }else if(n.type_id == 7){
                myres_source = "我的共享";
              }
                json_tem.list[i]["myres_source"] = myres_source;
        }else{          
          var range_type = $("#view_id_hid").val();
          json_tem.range_type = range_type;
        }
         
        json_tem.list[i]["app_type_title"] = json_tem.list[i]["app_type_name"];
        var _apptype = json_tem.list[i]["app_type_name"];
        var _apparr = _apptype.split(",");
        if(_apparr.length > 1){
          json_tem.list[i]["app_type_name"] = _apparr[0] + "...";
        } 

        //新的service方式，id是发布id,删除时得用到，所以这里不能让它改成别的值，刘博2016-04-19
        //json_tem.list[i]["id"] = _id;
        json_tem.list[i]["class_b"] = _class;
        json_tem.list[i]["class_a"] = "text-overflow " + _class;
        json_tem.list[i]["title"] = _title;
        json_tem.list[i]["href"] = _href;
        json_tem.list[i]["href_a"] = _href;
        json_tem.list[i]["data_original"] = _file_path_thumb;
          }); 
}

var resArray = new Array();
function beforeRender(data){
    var addToArray = function(id, rec){
        resArray[id] = rec;
    };
    
    data.addToArray = addToArray;
}

function setViewCount(){
  $.ajax({
         type : "GET",
         async : false,
         dataType:"json",
         url : url_path_html + "/tongji/tj_view?type_id=1&random_num=" + creatRandomNum(),
         success : function(data) {
            
       }
  });
}


//修改下载次数
function changeDownloadNum(info_id,resource_id_int,event){
  stopBubble(event);
    $.ajax({
            type : "GET",
                async : false,
                dataType:"json",
                url : url_path_html + "/ypt/resource/setDownCount?resource_id_int="+resource_id_int + "&random_num=" + creatRandomNum(),
                success : function(data) {
                    if(data.success){
                      
                    }else{
                      dealReturnMsg(data);
                    }
            }
    });
    //统计下载次数
    setDownloadCount();
}

//执行删除我的上传方法
function resourceDel(resInfoId,resIdInt,page_number,event){
  art.dialog.confirm("确定要删除吗？",function(){
    $.ajax({
      type : "POST",
      async : false,
      dataType:"json",
      url : url_path_html + "/ypt/group/deleteResource",
      data : {"resInfoId": resInfoId, "resIdInt":resIdInt, "deleteType":1},//课件 教案 备课 材料
      success : function(data) {
        if(data.success){
          art.dialog({
            content: "正在删除资源...",
            width: 240,
            title: "提示",
            close:function(){
              return true;
            },
            init: function(){
              var _this = this;
              setTimeout(function(){
                   _this.close();
                   delPublish(1,resIdInt,function(){},1);
                   toPage(page_number);
                 },3000);
            }
          });
        }
      }
    });
  });
  stopBubble(event);
}

/**
 * 统计下载次数
 * 姜莹莹
 * 2014年11月26日
 */
function setDownloadCount(){
    $.ajax({
        type : "GET",
        async : false,
        dataType:"json",
        url : url_path_html + "/tongji/tj_down?type_id=1&random_num=" + creatRandomNum(),
        success : function(data) {
          
      }
  });
}
