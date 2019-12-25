//移动：数组之间的数据变化
var hanno = {
    c1: [6, 5, 4, 3, 2, 1],
    c2: [],
    c3: [],
}

var minWidth = 60; //编号为1的圆盘的宽度
var step = 40; //编号每增加1,增加的宽度
var isOver = false;

/**
 * 根据hanno中的数据生成界面
 * @return {[type]} [description]
 */
function render() {
    renderColumn("c1");
    renderColumn("c2");
    renderColumn("c3");
    if (isOver) {
        document.write("游戏结束");
    }

    /**
     * 根据柱子编号渲染某一根柱子
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    function renderColumn(cno) {
        var divColumn = document.getElementById(cno); //拿到柱子的容器
        divColumn.innerHTML = ""; //清空之前的东西
        var values = hanno[cno]; //数组
        // console.log(values);
        for (var i = 0; i < values.length; i++) {
            var v = values[i]; //数组中的每一项
            var item = document.createElement("div");
            item.className = "item";
            item.style.width = 60 + (v - 1) * step + "px";
            divColumn.appendChild(item);
        }
    }

}

render()

/**
 * 移动数组内容
 * @param  {[type]} from [description]
 * @param  {[type]} to   [description]
 * @return {[type]}      [description]
 */
function move(from, to) {
    if (isOver) {
        return; //游戏结束了
    }
    if (from === to) {
        return; //一个柱子
    }

    var fromValues = hanno[from]; //原始数组
    if (fromValues.length == 0) {
        return; //原始数组为空
    }
    var toValues = hanno[to]; //目标数组

    if (toValues.length == 0) {
        //目标数组为空，能移动
        _move();
    } else if (fromValues[fromValues.length - 1] < toValues[toValues.length - 1]) {
        //原始数组的最后一项必须小于目标数组最后一项的值
        _move();
    } else {
        return;
    }


    function _move() {
        //将原始数组的最后一项加入到目标数组中
        toValues.push(fromValues.pop());
        //每次移动过后判断时都结束
        if (hanno.c1.length == 0 && hanno.c2.length == 0) {
            isOver = true;
            console.log("游戏结束");
        }
        render();

    }
}

// move("c1","c2");


//注册事件,利用事件委托
var btns = document.getElementById("btns");

btns.onclick = function(e) {
    if (e.target.tagName !== "BUTTON") {
        return;
    }

    var from = e.target.getAttribute("from");
    var to = e.target.getAttribute("to");
    // console.log(from,to)

    move(from, to);
}

