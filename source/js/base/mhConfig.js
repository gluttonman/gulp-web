$(function(){
    printNotice();
    printSubject();
	initMouseEvent();
	initLoginHeader();//验证sso
});


function printNotice(){
	//当纯在接收对象
	if($("#newNoticeSpan").length > 0){
		var url = url_path_html + "/yx/notice/getNoticeDataJson?org_id=" + getHoleOrgId();
		$.ajax({
			async:true,
			url : url,
			type : "get",
			dataType : 'json',
			success : function(data){
				if(data.success){
					if(data.list.length > 0){
						var a_url = "news.html?id=" + data.list[0].notice_id;
						var notice_a = '<a title="' + data.list[0].title + '" style="float: left;" href="' + a_url + '" target="_blank">' + data.list[0].title + '</a>';
						$("#newNoticeSpan").html(notice_a);
					}else{
						var notice_a = '<a title="" style="float: left;">暂无公告</a>';
						$("#newNoticeSpan").html(notice_a);
					}
				}
			}
		});
	}
}


function initMouseEvent(){
	initMenuStyle();
	initSubjectMenuStyle();
	initLoginBtn();
}


//门户菜单样式
function initMenuStyle(){
	 $(".nav_web ul li a").removeClass("on");
     $(".nav_web ul li a").each(function(){
        if($(this).attr("href").replace(".html","") == action_path_html){
          $(this).addClass("on");
        }
     });
}
//学科门户菜单样式
function initSubjectMenuStyle(){
	$(".mh_nav_navlist li a").removeClass("on");
    $(".mh_nav_navlist li a").each(function(){
      var charIndex = $(this).attr("href").indexOf(".html");
      var href_value = $(this).attr("href"); 
      href_value = href_value.substr(0,charIndex); 
	  if(href_value == action_path_html){
	     $(this).addClass("on");
	  }
	  if(null != GetQueryString("stage_id") && null != GetQueryString("subject_id")){
		  href_value += ".html?stage_id=" + GetQueryString("stage_id");
	      href_value += "&subject_id=" + GetQueryString("subject_id");
	      $(this).attr("href",href_value);
	  }
    });
}

function initLoginBtn(){
	
	$(document).on("focus","#user",function(){
		if($(this).val() == '请输入用户名'){
			$(this).val('');
		}
	}).on("blur","#user",function(){
		if($.trim($(this).val()) == ''){
			$(this).val('请输入用户名');
		}
	});

	$(document).on("focus","#pwd",function(){
		if($(this).val() != '请输入密码'){
			return;
		}
		$(this).remove();
		$("#password_span").append('<input id="pwd" name="密码" style="width:150px;" type="password" class="mh_Login_input login_mi"/>');
		setTimeout(function(){
			$("#pwd").focus();
	    },1);
	}).on("blur","#pwd",function(){
		if($.trim($(this).val()) == ''){
			$(this).remove();
			$("#password_span").append('<input id="pwd" name="密码" style="width:150px;" type="text" value="请输入密码" class="mh_Login_input login_mi"/>');
		}
	}).on("focus","#yzmvalue",function(){
		if($(this).val() != '验证码'){
			return;
		}
		$(this).val('');
	}).on("blur","#yzmvalue",function(){
		if($(this).val() == ''){
			$(this).val('验证码');
		}
	}).on("keyup","#yzmvalue",function(event){
		if(event.keyCode == 13){
			doLogin();
			//dologinWeb();
		}
	});
	
	
	
	
	$(document).on("click","#login_btn",function(){
		doLogin();
		//dologinWeb();
	});
	
	if(undefined != $.cookie("ydrz")){
		$("#logout_btn").hide();
		//把手机端下载链接隐藏
		$("#appDownloadLink").hide();
	}else{
		$(document).on("click","#logout_btn",function(){
			doLogout();
			//dologoutWeb();
		});
	}
}

var outTime = null;
function printSubject(){
  	//initSubjectGuideBtn();
	initSubjectStyle();
	if(null != GetQueryString("org_id")){
      $("#subject_header_content a").each(function(){
        var hr = $(this).attr("href");
        $(this).attr("href",hr + "&org_id=" + GetQueryString("org_id"));
      });
    }
}


function initSubjectGuideBtn(){
	$("#while_subject_btn").hover(function(){
		clearTimeout(outTime);
		var index = $("#while_subject_btn").index($(this));
		$("#subbox").show();
		$("#subbox .cont").show();
		var _height = $("#subbox .cont").eq(index).height()+50;
		$("#subbox").stop().animate({
			height : _height,
			opacity:1
		},400);
		$("#orgbox").hide();
	},function(){
		outTime = setTimeout(function(){	
			$("#subbox .cont").hide();
			$("#subbox").stop().animate({
				height:0,
				opacity:0
			},400);
		},1000);
		$("#while_subject_btn").removeClass("now");
	});
	
	$("#subbox .cont").hover(function(){
		clearTimeout(outTime);
		$(this).show();
		var _height = $(this).height()+50;
		$("#subbox").stop().animate({
			height : _height,
			opacity:1
		},400);
		
	},function(){
		var _this = $(this);
		outTime = setTimeout(function(){
			_this.hide();
			$("#subbox").stop().animate({
				height:0,
				opacity:0
			},400);
		},50);
		$("#while_subject_btn").removeClass("now");
	});
}

function initSubjectStyle(){
	var whole_stage_id = GetQueryString("stage_id");
	var whole_subject_id = GetQueryString("subject_id");
	if(null != whole_stage_id && null != whole_subject_id){
		
		if(whole_subject_id == 26){
			$(".header h1").text("小学语文");
		}else if(whole_subject_id == 2){
			$(".header h1").text("小学数学");
		}else if(whole_subject_id == 3){
			$(".header h1").text("小学英语");
		}else if(whole_subject_id == 4){
			$(".header h1").text("小学科学");
		}else if(whole_subject_id == 38){
			$(".header h1").text("小学品德");
		}else if(whole_subject_id == 91){
			$(".header h1").text("学前教育");
		}
		
        //动态改变样式
       if(whole_stage_id==4){
			$("#web5").remove();
			$("#web6").remove();
			
		}else if(whole_stage_id==5){
			$("#web4").remove();
			$("#web6").remove();
		}else if(whole_stage_id==6){
			$("#web4").remove();
			$("#web5").remove();
		}
	}else{
		$("#while_subject_btn span").text("学科导航");
	}
}

function initLoginHeader(){
	if(undefined != $.cookie("person_id") && "null" != $.cookie("person_id")){
		changeLogin();
	}else{
		changeLogout();
	}
};




function doLogin(){
	
	var login_name = $("#user").val();
	var login_pwd = $("#pwd").val();
	if(login_name == '请输入用户名' || login_pwd == '请输入密码' || $.trim(login_name) == '' || $.trim(login_pwd) == ''){
		alert('请输入用户名和密码');
	}else{
		//用户输入的验证码
		var yzmvalue = $("#yzmvalue").val();
		$.ajax({
			type:"get",
			async: false,
			url:url_path_html + "/login/doLogin?random_num=" + Math.random(),
			//url:url_path_html + "/adminlogin/doLogin?random_num=" + Math.random(),
			data:{
				login_type : 1,
				user : login_name,
				pwd : login_pwd,
				yzm:yzmvalue,
	            passtext:$("#contenttext").val()
			},
			dataType : "json",
			success:function(data){
				if(data.success){
					
					$.cookie("person_id", data.person_id, {path:"/"});
					$.cookie("identity_id", data.identity, {path:"/"});
					$.cookie("person_name", data.person_name, {path:"/"});
					$.cookie("token", data.token, {path:"/"});
					//$.cookie("background_user", data.user, {path:"/"});
					//$.cookie("background_role_id", data.role_id, {path:"/"});
					//头像路径
					$.cookie("avatar_url", getYptPersonTx(), {path:"/"});
					getPersonInfo();
					changeLogin();
					
				}else{
					//验证码错了
					if(data.yzm_success==false){
						//清空已输入的验证码
						$("#yzmvalue").val("");
						//重新加载验证码
						getContainertext();
						alert("验证码错误，请重新输入！");
					}else{
						alert("用户名不存在或密码错误");
					}
				}
			}	
		});
	}
}


//头像
function getYptPersonTx(){
	var retVal = "";
	$.ajax({
		async: false, 
		method : "POST",
        url : url_path_html + "/space/common/getAvatar?random_num="+Math.random(),                
        data:{
        	"person_id":$.cookie("person_id"),
        	"identity_id":$.cookie("identity_id")
        },
		dataType:"json",
        success: function(data)
        {
            if(data.success){
               var file_id = data.avatar_file_id;
			   
			   var _two = file_id.substring(0,2);
			   img_path = url_path_html + "/html/thumb/Material/" + _two + "/" + file_id; 
			   retVal = img_path;
			   
            }
        }
    });
	
	return retVal;
}



var yzmFocus_count = 0;
function yzmFocus(){
	if(yzmFocus_count == 0){
		getContainertext();
		yzmFocus_count = yzmFocus_count + 1;
	}
}

function getContainertext(){
	$("#yzm").show();
    $.ajax({
        type: "POST",
    async: false,
    url: url_path_html + "/adminlogin/captchaText",
    dataType:"json",
    success: function (data) {
        var keyValue = data.text.replace(/\+/g,"%2B");
        $("#contenttext").val(keyValue);
        $("#yzm").attr("src",url_path_html + "/adminlogin/captchaImage?text="+keyValue);
        }
    });
}

function doLogout(){
	var url = url_path_html + "/login/doLogout?t=" + Math.random();
	$.ajax({
		url:url,
		type:"get",
			async: false,
			success:function(data){
				changeLogout();
			}
		});
}
	
function changeLogin(){
	if($.cookie("identity_id") != 5){
		alert("您所属的身份无法登录系统");
		changeLogout();
		return;
	}
	showPersonMessage();
	
	if(undefined == $.cookie("background_role_str") || null == $.cookie("background_role_str")){
		getPersonInfo();
	}
}
function showPersonMessage(){
    $("#loginForm").hide();
    $("#personName").text($.cookie("person_name"));
	$("#manage").show();
    $("#loginMessage").show();
}
function changeLogout(){
	if(window.location.pathname.indexOf("manage.html") > 0){
		window.location = "index.html";
	}
	showLoginBtn()
	
}
function showLoginBtn(){
    $("#loginForm").show();
    $("#loginMessage").hide();
	$("#manage").hide();
}
//修改个人信息 web
function info_modify_web(){
	
	if(typeof(dsidealsso)=="undefined" || dsidealsso == 0){
		if(1 == $.cookie("ydrz")){
			tb_show("修改头像",url_path_html + "/yx/html/web/info_modify.html?dsidealsso=1&TB_iframe=true&height=470&width=560","thickbox");
		}else{
			tb_show("修改个人信息",url_path_html + "/yx/html/web/info_modify.html?dsidealsso=0&TB_iframe=true&height=470&width=560","thickbox");
		}
	}else{
		tb_show("修改头像",url_path_html + "/yx/html/web/info_modify.html?dsidealsso=1&TB_iframe=true&height=470&width=560","thickbox");
	}
}