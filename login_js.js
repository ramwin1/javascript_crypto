// JavaScript Document

// 王祥: 防止跨站请求伪造攻击
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


function post(){

	var user=$(".username").val();
	var pw=$(".pw").val();
	
	// 王祥: 把 pw 加密, 得到 pw 和 gb
	var ramwin1_g = 32767;
	var ramwin1_ga = 15673;
	var ramwin1_p = 82793;
	pw = ramwin1_to_int(pw);
	// pw = parseInt(pw,16)
	ramwin1_b = Math.round(Math.random()*80000);
	gb = power(ramwin1_g,ramwin1_b,ramwin1_p);
	gab = power(ramwin1_ga,ramwin1_b,ramwin1_p);
	gab_md5 = hex_md5(gab.toString());
	gab = 0;
    console.log("gab_md5=",gab_md5);
    console.log("pw=",pw);
	// pw = pw^gab;
	pw = str_of_hex_xor(pw,gab_md5);
	console.log(pw);
	$.ajax({
		type: "POST",
		url: "/normal/login/",
		data: {
			username: user,
			password: pw,
			gb:gb,
			csrfmiddlewaretoken: csrftoken,    // 王祥: 防止跨站请求伪造攻击
		},
		dataType: "json",
		success: function(data) {
			if(data['status']=="success"){
				alert("登陆成功！！");
			//window.history.back(-1); //返回上一页面
			
				window.location.href="/workspace/";
			}else{
				// window.location.href="http://www.baidu.com";
			}
		},
		error:function(data,status,e){
			alert(e);	alert("ajax请求失败!");	
		}
	});
}
