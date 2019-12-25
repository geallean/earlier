/**
 * 一种防止污染全局变量的写法
 * 但是不好，函数多起来会有很多全局变量函数
 */
/*
var openConfirm = (function() {
    
    // 打开一个确认对话框
    
    function openConfirm() {
        console.log("open");
    }

    //初始化函数
    function initElement() {

    }

    return openConfirm();
}())
*/


/**
 * 只污染一个全局变量来挂载插件
 * @param  {[type]} !window.myPlugin [description]
 * @return {[type]}                  [description]
 */
if (!window.myPlugin) {
    window.myPlugin = {};
}

/**
 * 弹出框插件
 * @param  {[type]}
 * 自定义配置参数：
 * {
        title: "这是配置标题",
        content: "zheshi配置的内容",
        btnConfirmText: "OK",
        btnCancelText: "cancel",
        btnConfirmClass: "confirm", //设置按钮类名来自定义样式
        btnCancelClass: "cancel",
        onconfirm:function(){//点击确定时触发的事件
            console.log("点击了确定");
        },
        oncancel:function(){//点击取消时触发的事件
            console.log("点击了取消");
        }
    }
 * @return {[type]}   [description]
 */
window.myPlugin.openConfirm = (function() {
    var divModal, //蒙层
        divCenter, //中间的提示框
        options, //配置变量
        spanTitle, //配置标题dom
        spanClose, //关闭X dom
        divContent, //配置内容dom
        btnConfirm, //确定按钮dom
        btnCancel; //取消按钮doms


    /**
     * 打开一个确认对话框
     * @param [opt  用户自定义传入的配置]
     */
    function openConfirm(opt) {
        if (typeof opt === "string") {
            opt = {
                content: opt
            };
        }
        if (!opt) {
            opt = {}; //如果没有传配置，则默认创建一个空对象
        }
        options = opt; //将用户传入的参数赋值给全局变量
        initModal();
        initCenterDiv();
        regEvent();
    }

    function regEvent() {

        spanClose.onclick = function() {
            // divModal.style.display = "none";
            document.body.removeChild(divModal);
            divModal = "";
            divCenter = "";
        }
        //事件会冒泡，所以要判断事件源
        divModal.onclick = function(e) {
            if (e.target === this) {
                // divModal.style.display = "none";
                document.body.removeChild(divModal);
                divModal = "";
                divCenter = "";
            }
        }
        //取消按钮
        btnCancel.onclick = function() {
            if (options.oncancel) {
                options.oncancel();
            }
            document.body.removeChild(divModal);
            divModal = "";
            divCenter = "";
        }

        //确定按钮
        btnConfirm.onclick = function() {
            if (options.onconfirm) {
                options.onconfirm();
            }
            document.body.removeChild(divModal);
            divModal = "";
            divCenter = "";
        }

    }

    //初始化蒙层
    function initModal() {

        //防止重复创建，将dom声明到函数外
        //如果没有蒙层div,则创建
        if (!divModal) {
            divModal = document.createElement("div");
            //蒙层样式
            var divSytle = divModal.style;
            divSytle.position = "fixed";
            divSytle.width = divSytle.height = "100%";
            divSytle.top = divSytle.left = 0;
            divSytle.background = "rgba(0,0,0,0.2)";

            //创建完成后，显示
            divModal.style.display = "block";
            //加入到页面
            document.body.appendChild(divModal);
        }

    }

    //初始化中间的div提示框
    function initCenterDiv() {
        if (!divCenter) {
            divCenter = document.createElement("div");
            var divSytle = divCenter.style;
            //如果页面上没有dom元素设置为提示框，新建一个提示框，设置宽高
            divSytle.width = "300px";
            divSytle.height = "180px";
            divSytle.background = "#fff";

            divSytle.position = "absolute";
            divSytle.top = divSytle.left = "50%";
            divSytle.transform = "translate(-50%,-50%)";

            initDivCenterContent();

            divModal.appendChild(divCenter);


            //dom对象----创建之后就得到
            //通过自定义属性获取dom元素 
            spanTitle = divCenter.querySelector("[data-myplugin-id=title]");
            spanClose = divCenter.querySelector("[data-myplugin-id=close]");
            divContent = divCenter.querySelector("[data-myplugin-id=content]");
            btnConfirm = divCenter.querySelector("[data-myplugin-id=confirm]");
            btnCancel = divCenter.querySelector("[data-myplugin-id=cancel]");
        }

        //div内部结构生成后，设置可配置的文本
        spanTitle.innerText = options.title || "提示";

        divContent.innerText = options.content || "默认内容";

        btnConfirm.className = options.btnConfirmClass || "";
        btnConfirm.innerText = options.btnConfirmText || "确定";

        btnCancel.className = options.btnCancelClass || "";
        btnCancel.innerText = options.btnCancelText || "取消";
    }


    //初始化divCenter内部
    function initDivCenterContent() {
        //创建内部标题div
        var div = document.createElement("div");
        var divStyle = div.style;
        divStyle.height = "40px";
        divStyle.background = "#eee";
        divStyle.boxSizing = "border-box";
        divStyle.padding = "10px 20px";

        //为元素加上自定义属性，用来选取DOM进行配置或者绑定事件
        div.innerHTML = `
            <span style="float:left" data-myplugin-id="title"></span>
            <span style="float:right;cursor:pointer" data-myplugin-id="close">
                <img style="width:12px;height:12px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVRYR9WX74dUURjHn+eMiIjYRIrYxCqWiCU2pRRLZMbMHzJz507v9l1zzr37hzRaEUsprSIiIsqyFbGJVURErDlPvtczY37duXO3nV2dlzP3nOfz/T7nPM857JxbJ6LjIrIchuED2odhrS0x8zIRfWfn3HsiOk9EnplLQRA8nCZDFEV3RARCDRF9YKW5rz/siEgpDMNH04Cw1t5mZgQ/BMEiUmEEUipA4I8/6sTaXkJEUbSkyg8T0Q4zV+B2AoChdIDAB7+JqFSv1x/vBYRz7hYRQfkRCITyjstdAHUClIDAh780HU//BcJae0NtPwphqrzrbh8AAiktIDDhp6bj+W4goii6prYfgyAiqgy6OgSg6QA1IDDxh6bjRR4I59wVtX0GQtT2ITdHAmg6QA8ILLBNRMV6vf5qEgjn3GUiWiWiExCgto90MRVA0wEVgMBC3wqFQrFarb4eB7GysrLQbrcR/KSCw/ZU98YCKATUtHTBLWNMsVarvRkFEcfxJe89gp8GMBGVs1zLBEAgVQUILPxF0/G2F8I5d1FtP0NEW4VCoZzlFuZPBIAPVR0gEOCzpuOdAs6r7bMANMaU01wadG5iAE0HVAJilpk34YQuuCoi5wCmtve5M27P5ALoqPXetzTghi4+ByAor1ariSuTjtwAekQviAicmNNAG8xcDoIAnTXX+P8Ams3mPDO3mBk576ZARDZFpNxoNKaXAj1qySZEQNQE+I2zr0DT24SDx9B7X+yohSvGGBSg6RxDa+0CbM9TiJCOMAzHlu2JCpE2loMpxXEcL7bbbWy4pBmJSDFLlbqVNCMR2UZJrtVqL9POZuoxtNZeVdtnsBAz52rHIoKNmbRjTQeu/0NjJEAURde10CQXEu2AqSpSOuOidsbkQqKF6llmL4jj+CZKbedKpraPpM8qeeoi0pFcybRJPemd1+dAs9lcMsZ0L6WwPQiCIeqswL3/q5uASC6l3vtKo9EYvpQOXsvV9j7aPIF7v1VXATH6Wj74MPHel3opdxu4d566i7dB/8PkwJ9m1tqPzHz2IB6nIvIJr+N1ETlFRHf383lORPeY+etflcvqsEGI1MwAAAAASUVORK5CYII=">
            </span>
        `;

        divCenter.appendChild(div);


        //创建提示文本div
        div = document.createElement("div");
        var divStyle = div.style;
        divStyle.height = "80px";
        // divStyle.background = "#eee";
        divStyle.boxSizing = "border-box";
        divStyle.padding = "20px";

        //设置自定义属性---dataset,myPluginId驼峰命名法转化为短横线命名法
        div.dataset.mypluginId = "content";

        // div.innerHTML = ``;

        divCenter.appendChild(div);


        //创建按钮div
        div = document.createElement("div");
        var divStyle = div.style;
        divStyle.height = "60px";
        // divStyle.background = "#eee";
        divStyle.boxSizing = "border-box";
        divStyle.padding = "10px 20px";
        divStyle.textAlign = "right";

        div.innerHTML = `
            <button data-myplugin-id="confirm"></button>
            <button data-myplugin-id="cancel"></button>
        `;

        divCenter.appendChild(div);
    }

    //最后将函数返回以供外部调用
    return openConfirm;
}())



/**
 * 混合两个对象
 * @param  {[type]} obj1 [description]
 * @param  {[type]} obj2 [description]
 * @return {[type]}      [description]
 *
 * Object.assign(obj1,obj2)--将obj2混合到obj1中，改变obj1
 * Object.assign({},obj1,obj2)---obj1,obj2不改变
 */
this.myPlugin.mixin = function(obj1, obj2) {


    return Object.assign({}, obj1, obj2)


    // var newObj = {}；
    // // 复制obj2的属性
    // for(var prop in obj2){
    //  newObj[prop] = obj2[prop];
    // }
    // //将obj1中有 但obj2中没有的属性 添加到newObj中
    // for(var prop in obj1){
    //  if(!(prop in obj2)){
    //      newObj[prop] = obj1[prop];
    //  }
    // }

    // return newObj;
}


/**
 * 克隆对象，深浅控制
 * @param  {[type]} obj  [description]
 * @param  {[type]} deep [description]
 * @return {[type]}      [description]
 */
this.myPlugin.clone = function(obj, deep) {
    //如果是数组
    if (Array.isArray(obj)) {

        if (deep) {
            var newArr = [];

            for (var i = 0; i < obj.length; i++) {
                //如果数组的某一项是数组或是对象，执行clone就会走对应的流程
                newArr.push(this.clone(obj[i], deep));
            }

            return newArr;
        } else {
            return obj.slice(); //复制数组
        }
    }
    //对象
    else if (typeof obj === "object") {
        var newObj = {};

        for (var prop in obj) {

            if (deep) {
                //深度克隆
                newObj[prop] = this.clone(obj[prop], deep);
            } else {
                newObj[prop] = obj[prop];
            }
        }

        return newObj;
    }
    //基本类型
    else {
        return obj;
    }
}

/**
 * 函数科里化
 * @param  {[type]} func [用于固定参数的函数]
 * @return {[type]}      [参数不够则返回新的科里化函数，参数够了则执行]
 */
this.myPlugin.curry = function(func) {
    //得到从下标1开始的参数
    var args = Array.prototype.slice.call(arguments, 1); //固定的参数
    var that = this;
    //由于返回函数，函数调用的环境不确定，所以要注意this指向问题
    return function() {
        var curArgs = Array.from(arguments); //当前函数调用的参数
        var totalArgs = args.concat(curArgs);
        console.log(totalArgs);
        //参数数量够了
        if (totalArgs.length >= func.length) { //所有的函数都有一个length属性，表示它接收几个形参
            //参数数量够了
            return func.apply(null, totalArgs);
        } else {
            //参数数量不够
            //要返回一个新的curry函数
            //利用闭包
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}

/**
 * 管道函数
 * @return {[type]} [description]
 */
this.myPlugin.pipe = function() {
    //args为函数数组
    var args = Array.from(arguments);

    return function(val) {

        return args.reduce(function(result, func) {
            return func(result);
        }, val);


        // for(var i = 0; i < args.length; i++){
        //  //把每一个函数拿出来
        //  var func = args[i];
        //  //每一个函数运行的结果是下一个函数运行的参数
        //  //将函数运行的结果赋值给val以便下一个函数调用
        //  val = func(val);
        // }
        // return val;
    }
}

/**
 * 防抖函数封装--高阶函数---在动作结束之后再运行
 * @param  {Function} callback [description]
 * @param  {[type]}   delay    [description]
 * @return {[type]}            [description]
 */

this.myPlugin.debounce = function(callback, delay) {
    var timer;
    //利用闭包，不污染全局变量
    return function() { //handle函数，用户调用handle函数传参
        clearTimeout(timer); //将之前的timer清除
        var args = arguments; //利用闭包保存handle函数的参数,方便后面在定时器的回调函数中传入
        timer = setTimeout(function() {
            callback.apply(null, args); //将handle函数的参数传入callback函数
        }, delay);
    }
}

/**
 * 函数节流--事件一直在运行，固定频率
 * @param  {Function} callback [description]
 * @param  {[type]}   wait     [description]
 * @return {[type]}            [description]
 */
this.myPlugin.throttle = function(callback, wait, immediately) {
    if (immediately === undefined) {
        immediately = true;
    }

    if (immediately) {
        var t; //时间戳
        return function() {
            if (!t || Date.now() - t >= wait) { //如果没有计时 或者 距离上次执行的时间超过了规定的值
                callback.apply(null, arguments);
                t = Date.now();
            }
        }
    } else {
        var timer;
        return function() { //handle函数
            if (timer) {
                return; //如果已经有计时了，什么都不做
            }
            var args = arguments; //利用闭包保存handle函数的参数
            timer = setTimeout(function() {
                callback.apply(null, args); //将handle函数的参数传入callback函数
                timer = null; //函数节流时记得把计时器清空
            }, wait);
        }
    }
}


/**
 * 动画插件
 * @param {[type]} option [description]
 */
this.myPlugin.Animate = function(option) {
    //默认配置
    var defaultOption = {
        duration: 16, //默认间隔时间
        total: 500, //默认总时间
        begin: {}, //初始值
        end: {}, //终止值
    };
    
    this.option = myPlugin.mixin(defaultOption, option);
    this.timer = null; //计时器ID
    //运动总次数
    this.number = Math.ceil(this.option.total / this.option.duration);
    //当前运动的次数
    this.curNumber = 0;
    //当前状态
    this.curData = myPlugin.clone(this.option.begin);
    //所有属性运动的总距离
    //循环begin相减
    this.distance = {};
    //所有属性每次运动的距离
    //循环this.distance
    this.everyDistance = {};
    for (var prop in this.option.begin) {
        this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
        this.everyDistance[prop] = this.distance[prop] / this.number;
    }
}

/**
 * 开始动画
 * @return {[type]} [description]
 */
this.myPlugin.Animate.prototype.start = function() {
    if (this.timer || this.curNumber == this.number) {
        return; //如果之前存在计时器，则不作任何处理
    };

    var that = this;

    //如果配置中有监听onstart函数，则调用
    if(this.option.onstart){
        this.option.onstart.call(that);
    };
    
    this.timer = setInterval(function() {
        that.curNumber++; //当前运动次数加1

        //改变that.curData;发生变化
        for (var prop in that.curData) {
            if(that.curNumber == that.number){
                //最后一次运动
                that.curData[prop] = that.option.end[prop];
            }else{
                that.curData[prop] += that.everyDistance[prop];
            }
        }
        // console.log(that.curData);
        //监听发生变化事件
        if(that.option.onmove){
            that.option.onmove.call(that);
        }
        
        if (that.curNumber == that.number) { //如果当前运动次数等于总次数
            //等于了总次数
            that.stop();
            if(that.option.onover){
                that.option.onover.call(that);
            }
        }
    }, this.option.duration);
}

/**
 * 停止动画
 * @return {[type]} [description]
 */
this.myPlugin.Animate.prototype.stop = function() {
    clearInterval(this.timer);
    this.timer = null;
}

// var animate = new this.myPlugin.Animate({
//     duration: 30,
//     total: 500,
//     begin: {
//         a: 100,
//         b: 150,
//         c: 100
//     },
//     end: {
//         a: 500,
//         b: 15,
//         c: 200
//     },
//     onstart:function(){
//         console.log("开始");
//     },
//     onmove:function(){//当每次发生变化时
//         console.log(this.curData);
//     },
//     onover:function(){
//         console.log("over");
//     }
// })

// console.log(animate);