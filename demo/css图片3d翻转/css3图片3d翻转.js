// 通过getElementsByTagName获取到的是类数组，将类数组转化为数组用slice方法

var oLi = Array.prototype.slice.call(document.getElementsByTagName('li'));


oLi.forEach(function(ele, index) {

	ele.spec = getSpec(ele);

    ele.addEventListener('mouseenter', function(e) {
        addClass(this, e, "in");
    })
    ele.addEventListener('mouseleave', function(e) {
        addClass(this, e, "out");
    })
})

function getSpec(ele) {
    return {
        w: ele.offsetWidth,
        h: ele.offsetHeight
    }
}


function addClass(ele, e, state) {
    // x轴方向鼠标进入的坐标值
    // 获取offsetxxx会触发回流(重排)
    var x = e.offsetX - ele.spec.w / 2;
    var y = e.offsetY - ele.spec.h / 2;

    //Math.atan2()用于计算弧度，然后转换为角度
    //各条边的角度取值范围：按对角线分：
    //上边：(-45,-135)
    //右边：(-45,45)
    //下边：(45,135)
    //左边：(135,180)U(-135,-180)
    var d = Math.atan2(y, x) * (180 / Math.PI);

    // 
    // 希望将数值处理为每条边对应不同的数值1,2,3,4
    // 先将各角度值+180度，然后再除以90,然后将值四舍五入取整
    // 得到的值为：
    // 上：(45,135)-->(0.5,1.5)-->1
    // right:(135,225)-->(1.5,2.5)-->2
    // bottom：(225,315)-->(2.5,3.5)-->3
    // left:(315,360)U(45,0)-->(3.5,4)U(0,0.5)-->0,4
    var d1 = Math.round((d + 180) / 90);
    // 由于left边有两个范围，所以进一步处理：
    // 将所有值加3，再对4取余
    // top:4--->0
    // right:5--->1
    // bottom:6--->2
    // right:3,7--->3
    var d2 = (d1 + 3) % 4;
    console.log(d2);


    var direction;
    //进行判断：
    switch (d2) {
        case 0: //代表从上边进入或者出去
            direction = "top";
            break;
        case 1:
            direction = "right";
            break;
        case 2:
            direction = "bottom";
            break;
        case 3:
            direction = "left";
            break;
    }
    //添加class类名
    ele.className = state + '-' + direction;
}