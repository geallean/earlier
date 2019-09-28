var personArr = [
    { name: "王刚", src: "../../image/touxiang/touxiang (1).jpg", des: "颈椎不好", sex: "m" },
    { name: "刘颖", src: "../../image/touxiang/touxiang (2).jpg", des: "我是谁", sex: "f" },
    { name: "王秀英", src: "../../image/touxiang/touxiang (3).jpg", des: "我很好看", sex: "f" },
    { name: "刘翔", src: "../../image/touxiang/touxiang (4).jpg", des: "瓜皮刘", sex: "m" },
    { name: "慧慧", src: "../../image/touxiang/touxiang (5).jpg", des: "天下最美", sex: "f" },
];

var oUl = document.getElementsByTagName("ul")[0];
var oInput = document.getElementsByTagName("input")[0];
//事件委托，将监听事件绑定到父元素上，节约性能
var oP = document.getElementsByTagName("p")[0];
// console.log(oP);

// console.log(typeof preSpan.className);


/**
 * [renderList 传入数组渲染页面]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function renderList(arr) {
    var str = '';
    arr.forEach(function(ele, index) {
        str += `<li>
                    <img src="${ele.src}" alt="">
                    <div class="chat">
                        <p class="username">${ele.name}</p>
                        <p class="des">${ele.des}</p>
                    </div>
                </li>`;

    });
    oUl.innerHTML = str;
}
renderList(personArr);

//indexOf() 
// var aa = "abc";
// console.log(aa.indexOf("b"));//1,不包含则返回-1

var state = {
    text: "",
    flag: "a"
}


oInput.oninput = function() {
    state.text = this.value;
    // console.log(this.value);

    // var arrResult = filterText(text, personArr);
    // console.log(filterText(text,personArr));
    // var lastArr = filterText(state.text,personArr);
    // var arrResult = filterSex(state.flag, lastArr);
    //渲染到页面上
    // renderList(arrResult);

    var arrResult = lastFilterFunc(personArr);
    renderList(arrResult);

}

/**
 * [filterText 根据name渲染数组]
 * @param  {[type]} text [description]
 * @param  {[type]} arr  [description]
 * @return {[type]}      [description]
 */
function filterText(text, arr) {
    //判断name值中包不包含text，包含返回true，不包含返回false
    var newArr = arr.filter(function(ele, index) {
        if (ele.name.indexOf(text) != -1) {
            return true;
        } else {
            return false;
        }
        // return ele.name.indexOf(text) != -1 ? true : false;
    });
    console.log(newArr);
    return newArr;
}


//监听p元素，判断事件源是不是span标签
oP.addEventListener("click", function(e) {
    // console.log(e.target);
    // console.log(e.target.nodeName);
    if (e.target.nodeName == "SPAN") {
        //如果点击的是span,就将上一个active类名的span类名置为空，再把当前这个span添加类名active
        var preSpan = document.getElementsByClassName("active")[0];
        preSpan.className = "";
        e.target.className = "active";


        var content = e.target.innerHTML;
        state.flag = content.slice(0, 1).toLowerCase();
        console.log(state.flag);

        //两次筛选，结合理解
        // var lastArr = filterText(state.text,personArr);
        // var arrResult = filterSex(state.flag, lastArr);
        // renderList(arrResult);

        // var lastArr = filterText(state.text,personArr);
        // lastArr = filterSex(state.flag, lastArr);
        // renderList(lastArr);


        var arrResult = lastFilterFunc(personArr);
        renderList(arrResult);

        // console.log(text.slice(0,1));

    }
})

function filterSex(flag, arr) {
    var newArr = arr.filter(function(ele, index) {
        if (flag === "a") {
            return arr;
        } else {
            if (ele.sex === flag) {
                // console.log(111);
                return true;
            } else {
                return false;
            }
        }

    });
    return newArr;
}




//这里是最重要的，也是比较难的部分
/**
 * [unionFilterFunc 将筛选条件整合]
 * @param  {[type]} obj [将筛选条件按照对象方式传入]
 * @return {[type]}     [description]
 */
function unionFilterFunc(obj) {
    //返回一个函数,通过传参将初始数据传入
    return function(arr) {
        var lastArr = arr;
        for (var prop in obj) {
            lastArr = obj[prop](state[prop], lastArr);
        }
        return lastArr;
    }
}

var unionFilterObj = {
    text: filterText,
    flag: filterSex
}

//这行这个函数得到一个函数，将函数保存用于在上面的事件中调用
var lastFilterFunc = unionFilterFunc(unionFilterObj);