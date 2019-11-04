function ajaxFunc(method, url, data, callback, flag) {
    var xhr = null;

//1.创建xhr对象
    // 兼容IE
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    // console.log(xhr.readyState + "--------------1----------");//0
    //将method转为大写
    method = method.toUpperCase();

    //封装get和post方法
    if (method == 'GET') {
        //创建一个时间戳，设置缓存，保证url唯一
        var date = new Date(),
            timer = date.getTime();
        //data为发送的数据，防止IE兼容性乱码,encodeURI()用来对中文参数进行编码
        data = encodeURI(data);
//2.open()方法准备发送
        // console.log(xhr.readyState + "--------------2----------");//0
        xhr.open(method, url + '?' + data, flag);
//3.send()方法执行发送
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        //post方法必须设请求头，设置了请求头不需要转码
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data); //post请求参数不需要转码，在send()方法中发送参数
    }

    //4.监听回调函数
    // console.log(xhr.readyState + "--------------2----------");//1

    //下面这个oneadystatechange事件调用了三次，由服务器调用，1->2,2->3,3->4,每一次变化都调用
    xhr.onreadystatechange = function() {
        // console.log(xhr.readyState + "--------------3----------");//2-3-4
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
        }
    }

    // readyState = 0 ----- xhr对象创建完成
    // readyState = 1 ----- 调用了send()之后，执行发送动作
    // readyState = 
        // 2 ----- 收到了服务器返回的数据，但还没有解析，不能使用
        // 3 ----- 正在解析数据
        // 4 ----- 数据已经解析完成，可以使用了，但并不代表数据正确，只有判断status=200才表示请求的数据正确

    //http常见状态码
    //200 响应成功
    //404 没有找到
    //500 服务器错误
}