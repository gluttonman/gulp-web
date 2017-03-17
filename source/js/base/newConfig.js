var tool_arr = 
	['undo', 'redo', '|',
	'bold', 'italic', 'underline', 'fontborder', 'strikethrough','|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
	'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
	'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
	'link', 'unlink', 
	'simpleupload'];
var icomet_path = "http://127.0.0.1";
var action_path_html;
function initAction_path_html(){
	//初始化action
	var pathName = document.location.pathname;
	var i_a = pathName.lastIndexOf("/");
	var i_b = pathName.lastIndexOf(".html");
	action_path_html =  pathName.substring(i_a + 1,i_b);
}
initAction_path_html();
initHdStatusParam();

function initHdStatusParam(){
	//获取活动状态
	template.helper("getHdStatus", function(start_time,end_time){
		var date = new Date();
		var start_date = new Date(start_time.replace(/-/g,"/"));
		var end_date = new Date(end_time.replace(/-/g,"/"));
		var status = '';
		if(date.getTime() < start_date.getTime()){
			status = "<span style='color:green'>[未开始]</span>";
		}else if(date.getTime() > end_date.getTime()){
			status = "[已结束]";
		}else{
			status = "<span style='color:red'>[进行中]</span>";
		}
		return status;
	});
}
/**
 * @param dataFormat
 * @param url
 */
function dataRender(dataFormat,url,div_name,script_name,type,callBack){
   $.ajax({
	   async:true,
       url : url,
       type : type,
       data : dataFormat,
       dataType : 'json',
       success : function(data){
    	   renderByData(script_name,div_name,data);
			if(undefined != callBack){
				callBack(data);
			}
       }
   });
}
//同步渲染
function dataRenderSync(dataFormat, url, div_name, script_name, type, callBack) {
	$.ajax({
		async: false,
		url: url,
		type: type,
		data: dataFormat,
		dataType: 'json',
		success: function(data) {
			renderByData(script_name, div_name, data);
			if (undefined != callBack) {
				callBack(data);
			}
		}
	});
}
function renderByData(script_name,content_name,data){
	var html = template(script_name, data);
	$("#" + content_name).html(html);
}

//分页处理
function go2Page(pageNumber, totalPage){
	page = Number(pageNumber);
	total = Number(totalPage);
	if(page > total || page < 1){
		return;
	}
	renderData(pageNumber);
}
function checkPage(text,maxPage){
    var pageNumber=Number(text.value);
    var totalPage=Number(maxPage);
	if(pageNumber > totalPage){
		text.value = totalPage;
	}else if(pageNumber<1){
		text.value=1;
	}
	return true;
}
/**
 * 查看分页跳转验证
 */
function checkNum(text){
	var reg = /^[1-9][0-9]{0,100}$/;
	if(reg.test(text.value)){
		if(text.value==0){
			text.value =1;
			return true;
		}else{			
			return true;
		}
	}else{
		text.value="";
		return false;
	}
}
/**
 * 日期对象转换为指定格式的字符串
 * @param f 日期格式，格式定义如下 yyyy-MM-dd HH:mm:ss
 */
function dateToStr(date,formatStr){
	 date = arguments[0] || new Date();
	 formatStr = arguments[1] || "yyyy-MM-dd HH:mm";
	 var str = formatStr;
	 var Week = ['日','一','二','三','四','五','六'];
	 str=str.replace(/yyyy|YYYY/,date.getFullYear());
	 str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));
	 str=str.replace(/MM/,date.getMonth()>=9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));
	 str=str.replace(/M/g,date.getMonth());
	 str=str.replace(/w|W/g,Week[date.getDay()]);
	 str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
	 str=str.replace(/d|D/g,date.getDate());
	 str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());
	 str=str.replace(/h|H/g,date.getHours());
	 str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());
	 str=str.replace(/m/g,date.getMinutes());
	 str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());
	 str=str.replace(/s|S/g,date.getSeconds());
	 return str;
 }
function dateAddHour(date,num){
	var m = num * 3600 * 1000;
	m = m + date.getTime();
	return new Date(m);
}

//获得门户org_id
function getHoleOrgId(){
	 /*var org_id = 99999;
	 var jsFileName = "newConfig.js";  
	 var rName = new RegExp(jsFileName+"(\\?(.*))?$");
	 var jss = document.getElementsByTagName('script');  
	 for (var i = 0;i < jss.length; i++){  
	   var j = jss[i];  
	   if (j.src&&j.src.match(rName)){  
	     var oo = j.src.match(rName)[2];  
	     if (oo&&(t = oo.match(/([^&=]+)=([^=&]+)/g))){  
	         for (var l = 0; l < t.length; l++){  
	             r = t[l];  
	             var tt = r.match(/([^&=]+)=([^=&]+)/);  
	             if (tt && tt[1] == "id")
	            	 org_id = tt[2];
	         }  
	     }  
	   }  
	 }*/
	 return 200089;
}

/**获取学段学科 start*/
var xd_subject_list = null;
function getSel_stage_subject(obj_id){
	if($("#" + obj_id).length > 0){
		$("#" + obj_id).html('<span>学段：</span><select class="form-control" id="sel_stage" style="width:100px;"><option value="0">全部</option></select>&nbsp;&nbsp;<span>学科：</span><select class="form-control" id="sel_subject" style="width:100px;"><option value="0">全部</option></select>');
	}
	$.ajax({
		async : false,
		url : url_path_html + "/resource/getStageSubject?random_num=" + Math.random(),
		type : "post",
		dataType : "json",
		success : function(data){
			if(data.success){
				xd_subject_list = data.xd_subject_list;
				getStageList();
			}
		}
	});
}

function getStageList(){
	if(xd_subject_list.length > 0){
		for(var i=0;i<xd_subject_list.length;i++){
			if(xd_subject_list[i].xd_id == 4 || xd_subject_list[i].xd_id == 8){
				$("#sel_stage").append('<option value="' + xd_subject_list[i].xd_id + '">' + xd_subject_list[i].xd_name + '</option>');
			}
		}
		$(document).on("change","#sel_stage",function(){
			getSubjectList($(this).val());
		});
	}
}
function getSubjectList(stage_id){
	$("#sel_subject").html('<option value="0">全部</option>');
	if(stage_id > 0){
		var subject_list = null;
		for(var i = 0; i < xd_subject_list.length;i++){
			if(xd_subject_list[i].xd_id == stage_id){
				subject_list = xd_subject_list[i].subject_list;
				break;
			}
		}
		if(null != subject_list && subject_list.length > 0){
			for(var i = 0; i < subject_list.length;i++){
				if(subject_list[i].subject_id == 2
						||subject_list[i].subject_id == 3
						||subject_list[i].subject_id == 4
						||subject_list[i].subject_id == 26
						||subject_list[i].subject_id == 38
						||subject_list[i].subject_id == 61
				){
					$("#sel_subject").append('<option value="' + subject_list[i].subject_id + '">' + subject_list[i].subject_name + '</option>');
				}
			}
		}
	}
}
/**获取学段学科 end*/


function getPersonInfo(){
	$.ajax({
		url:url_path_html + "/person/getPersonInfo?random_num=" + Math.random(),
		async: false,
		type: "POST",
		data: {
			person_id :  $.cookie("person_id"),
			identity_id : $.cookie("identity_id")
		},
		dataType: "json",
		success: function(data){
			if(data.success){
				$.cookie("background_person_id", $.cookie("person_id"), {path:"/"});
				$.cookie("background_person_name", $.cookie("person_name"), {path:"/"});
				$.cookie("background_identity_id", $.cookie("identity_id"), {path:"/"});
				$.cookie("background_token", $.cookie("token"), {path:"/"});
				
				$.cookie("background_bureau_id", data.table_List.bureau_id, {path:"/"});
				$.cookie("background_bureau_name", data.table_List.bureau_name, {path:"/"});
				$.cookie("background_bureau_type", data.table_List.bureau_type, {path:"/"});
				$.cookie("background_province_id", data.table_List.province_id, {path:"/"});
				$.cookie("background_city_id", data.table_List.city_id, {path:"/"});
				$.cookie("background_district_id", data.table_List.district_id, {path:"/"});
				$.cookie("background_school_id", data.table_List.school_id, {path:"/"});
				
				//学段学科名
				$.cookie("background_stage_subject_name", data.table_List.stage_name + data.table_List.subject_name, {path:"/"});
				
				if(null != data.table_List.roles && data.table_List.roles.length > 0){
					var role_str = "";
					for(var i=0;i<data.table_List.roles.length;i++){
						role_str = role_str + data.table_List.roles[i].role_code.toUpperCase() + ",";
						role_str = role_str + data.table_List.roles[i].role_id + ",";
						role_str = role_str + data.table_List.roles[i].role_name + ";";
					}
					if(role_str.indexOf(";") > 0){
						role_str = role_str.substring(0, role_str.length - 1);
					}
					$.cookie("background_role_str", role_str, {path:"/"});
					
					if(role_str.indexOf("YX,")>-1){
						$.cookie("background_role_code", "YX", {path:"/"});
						$.cookie("background_yx_manage_org_id", "99999", {path:"/"});
					}else{
						if(role_str.indexOf("YX_AREA_ADMIN")>-1 || role_str.indexOf("WL_ADMIN")>-1){
							$.cookie("background_role_code", "YX_AREA_ADMIN", {path:"/"});
							if (data.table_List.bureau_id == data.table_List.school_id){
								if(undefined != data.table_List.district_id && data.table_List.district_id > 0){
									$.cookie("background_yx_manage_org_id", data.table_List.district_id, {path:"/"});
								}else if(undefined != data.table_List.city_id && data.table_List.city_id > 0){
									$.cookie("background_yx_manage_org_id", data.table_List.city_id, {path:"/"});
								}else if(undefined != data.table_List.province_id && data.table_List.province_id > 0){
									$.cookie("background_yx_manage_org_id", data.table_List.province_id, {path:"/"});
								}else{
									$.cookie("background_yx_manage_org_id", "99999", {path:"/"});
								}
							}else{
								$.cookie("background_yx_manage_org_id", data.table_List.bureau_id, {path:"/"});
							}
						}else if(role_str.indexOf("YX_SCHOOL_ADMIN")>-1){
							$.cookie("background_role_code", "YX_SCHOOL_ADMIN", {path:"/"});
							if (data.table_List.bureau_id == data.table_List.school_id){
								$.cookie("background_yx_manage_org_id", data.table_List.bureau_id, {path:"/"});
							}
						}
					}
				}
				
				getTeacherInfo();
			}
		}
	});
}

function getTeacherInfo(){
	$.ajax({
		url:url_path_html + "/management/per/getTeacherInfo?random_num=" + Math.random(),
	async: false,
	type: "POST",
	data: {
		teacher_id :  $.cookie("person_id")
	},
	dataType: "json",
		success: function(data)
		{
			if(data.success){
				$.cookie("background_stage_id", data.table_list.columns.STAGE_ID, {path:"/"});
				$.cookie("background_subject_id", data.table_list.columns.SUBJECT_ID, {path:"/"});
				
				//不从这取学段学科名了，从getPersonInfo中取
				//$.cookie("background_stage_subject_name", data.table_list.columns.SUB_SUBJECT_NAME, {path:"/"});
				
				$.cookie("background_xb_name", data.table_list.columns.XB_NAME, {path:"/"});
				//getHeadImgUrl();
			}
		}
	});
}


function checkLogin(){
	//头像路径
	$.cookie("avatar_url", getYptPersonTx(), {path:"/"});
	getPersonInfo();
	changeLogin();
}

function playHelp(fileName){
	var dialog = art.dialog({
		width: 643,
      		height: 423,
	    title: '使用帮助',
	    content: '<div id="videoContent"></div>',
	    init : function(){
	    	var player = jwplayer("videoContent").setup({
	       		autostart: true,
	       		flashplayer: "../../js/red5player/player.swf",
	       		width: 643,
	       		height: 423,
	    		file: "../../video/"+fileName
	    	});
	    	
			player.onComplete(function(){
				dialog.close();
				playHelp(fileName);
            });
	    }
	});
}

function illegalChar(str)
{
    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;  
    if(pattern.test(str)){  
        return false;     
    }     
    return true;  
}

$(function(){
	var htm = $(".Copyright h1:first").html();
	htm = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + htm + '&nbsp;&nbsp;&nbsp;&nbsp;<a target=blank href=tencent://message/?uin=3521577854&Site=在线咨询&Menu=yes><img border="0" SRC=http://wpa.qq.com/pa?p=1:3521577854:1 alt="点击这里给我发消息"></a>';
	$(".Copyright h1:first").html(htm);
});