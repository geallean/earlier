function ajax(obj) {
	//默认参数
    var defaults = {
        type: "get",
        data: {},
        url: "#",
        dataType: "text",//需要服务器发回请求的类型，即浏览器端需要的类型
        async: true,
        success: function(data) { console.log(data) }
    };

    //处理形参，传递了参数就覆盖默认参数，不传递就使用默认参数
    for (var key in obj) {
        defaults[key] = obj[key];
    }

//1.创建XMLHttpRequest对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }

    //处理传到服务器的参数，把对象格式转化为字符串格式
    /**
     * {username:"zhangdan",password:"123"}
     * 转换为
     * username=zhangdan&password=123
     */
    var param = "";
    for (var attr in obj.data) {
        param += attr + "=" + obj.data[attr] + "&";
    }
    if (param) { //将最后的&截取掉
        param = param.substring(0, param.length - 1);
    }

    //拼接get请求参数，并处理中文乱码问题
    if (defaults.type == "get") {
        defaults.url += "?" + encodeURI(param);
    }

//2.准备发送（设置发送参数）
    xhr.open(defaults.type, defaults.url, defaults.async);

    //get请求发送的参数是null，post传递的则是参数
    var sendData = null;
    //处理post请求参数并设置请求头信息
    if(defaults.type == "post"){
    	sendData = param;
    	xhr.requestHeader("Content-Type","application/x-www-form-urlencoded");
    }
//3.发送请求
    xhr.send(sendData);

//4.处理同步请求，同步请求不会调用回调函数
    if(!defaults.async){
    	if(defaults.dataType == "json"){
    		return JSON.parse(xhr.responseText);
    	}else{
    		return xhr.responseText;
    	}
    }

//4.指定回调函数(处理服务器响应数据)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = xhr.responseText;
                if(defaults.dataType == "json"){
                	// 早期
                	// data = eval("("+ res +")");
                	res = JSON.parse(res);
                }
                defaults.success(res);
            }
        }
    }
}