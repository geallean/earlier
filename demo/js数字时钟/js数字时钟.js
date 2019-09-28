//存放全局变量及函数执行
function Index(dom, use24Hours) {
    //将获取到的dom类数组变为数组
    this.column = Array.from(dom);
    this.use24Hours = use24Hours;
    this.classList = ['visible', 'close', 'far', 'far', 'distance', 'distance'];
    this.createDom();
    this.start();
}

Index.prototype.createDom = function() {
    for (var i = 0; i < 6; i++) {
        var oDiv = '<div>' + i + '</div>';
        //获取dom并插入div
        $('.six').append(oDiv);
    }
    for (var i = 0; i < 10; i++) {
        var iDiv = '<div>' + i + '</div>';
        $('.ten').append(iDiv);
    }
}

//用于获取当前时间 并 处理时间格式
Index.prototype.getClock = function() {
    var d = new Date();

    var h, m, s;
    m = d.getMinutes();
    s = d.getSeconds();

    if (this.use24Hours) {
        h = d.getHours();
    } else {
        // 当12小时制的0点或24点没有余数时，取12
        h = d.getHours() % 12 || 12;
    }
    //把 时分秒 拼接成字符串
    var dArr = [h, m, s];
    // console.log(dArr);
    var clockArr = dArr.reduce(function(pre, ele, index) {
        // console.log(("0" + ele).slice(-2));
        return pre + ("0" + ele).slice(-2);
    }, "");
    return clockArr;
    // [this.use24Hours ? d.getHours() : d.getHours() % 12 || 12,  d.getMinutes(), d, getSeconds()].reduce(function(p, n) {
    //     return;
    // }, '')
}

//要无时无刻的获取到当前时间，所以要有一个定时器用来获取时间
Index.prototype.start = function() {
    //改变this指向
    var self = this;
    setInterval(function() {
        var c = self.getClock();
        // console.log(c);//210609
        // 210609---》c获取到的时间
        self.column.forEach(function(ele, index) {
            // console.log(c[index]);
            var n = +c[index];
            var offset = n * 86;
            // ele是dom元素，使用jq转成jq对象
            $(ele).css({
                "transform": `translateY(calc(50vh - 43px - ${offset}px))`
            });
            Array.from(ele.children).forEach(function(ele2, index2) {
                var className = self.getClass(n, index2);
                $(ele2).attr("class", className);
            });
        });
    }, 500);
}

Index.prototype.getClass = function(n, i2) {
    //i2是每一列中的每个div，index是classList中的索引，n是当前的时间
    //find返回的是满足index条件表达式的ele
    var className = this.classList.find(function(ele, classindex) {
        // return index === 0;
        // 这个算法中可以将classindex当做未知变量x,然后去求x--->|n-x| = i2,x是索引，但find返回的是索引对应的值
        return i2 - classindex === n || i2 + classindex === n;
    });
    console.log(className); //index==0时，返回visible

    //函数返回的是一个class类名，如果为空则返回空
    return className || "";
}


//生成index对象
new Index($('.column'), true);



//new Date Thu Sep 19 2019 10:16:25 GMT+0800 (中国标准时间)
//new Date().getHours()  10
//new Date().getMinutes() 16
//new Date().getSeconds() 25
//将获取到的事件变为--》101625
//但获取时间获取到秒时，如果是第五秒则是5 需要人为处理为05
//
//时间与每一列结构一一对应，当前时间居中显示
//数字的显示 有opacity决定 通过设置class类名


// 改变函数中setInterval的this指向，，，还可以用bind
/*Index.prototype.start = function(){
	setInterval(function(){
		// 这里的this指向window
		this.getClock();
		console.log(this);
	}.bind(this),5000)
}
*/









// 网上的另一套代码
/*
let size = 86;
let columns = Array.from(document.getElementsByClassName('column'));
let d, c;
let classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
let use24HourClock = true;

function padClock(p, n) {
  return p + ('0' + n).slice(-2);
}

function getClock() {
  d = new Date();
  return [
  use24HourClock ? d.getHours() : d.getHours() % 12 || 12,
  d.getMinutes(),
  d.getSeconds()].

  reduce(padClock, '');
}

function getClass(n, i2) {
  return classList.find((class_, classIndex) => Math.abs(n - i2) === classIndex) || '';
}

let loop = setInterval(() => {
  c = getClock();

  columns.forEach((ele, i) => {
    let n = +c[i];
    let offset = -n * size;
    ele.style.transform = `translateY(calc(50vh + ${offset}px - ${size / 2}px))`;
    Array.from(ele.children).forEach((ele2, i2) => {
      ele2.className = 'num ' + getClass(n, i2);
    });
  });
}, 200 + Math.E * 10);
*/