window.onload = function(){
	//加载socket
	var socket = io.connect();

	var oBtnSub = document.getElementById('subUser');
	var oBtnRe = document.getElementById('reUser');
	var oTextName = document.getElementById('userName');

	oBtnRe.onclick = function(){
		oTextName.value = '';
	};

	oBtnSub.onclick = function(){
		
	};
	

};

var tool = {
	setCookie : function(key, value){
		var Days = 30;
		var exp = new Date(); 
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); 
		document.cookie = key + '=' + escape (value) + ';expires=' + exp.toGMTString(); 
	},
	getCookie : function(key){
		var arr = [];
		var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]); 
		}else{
			return null;
		}
	},
	delCookie : function(key){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = tool.getCookie(key); 
		if(cval != null){
			document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
		}
	}

};