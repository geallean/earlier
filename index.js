var container = document.querySelector(".container");
var aHeight = 32; //每个a元素的高度

//事件委托
container.onclick = function(e) {
    if (e.target.tagName == "H2") {
        //1.去掉当前具有active样式的div
        var before = container.querySelector(".active");

        var div = e.target.nextElementSibling;
        if(div.classList.contains("active")){
        	return;
        }
        if (before) {
            hideDiv(before);
            
        }
        //2.给当前的h2元素后面的div加上active
        // var div = e.target.nextElementSibling;
        showDiv(div);
        // div.classList.add("active");
        // div.style.height = 0;
    }
}

//隐藏动画
function hideDiv(div) {
	var height = div.clientHeight;
	
	var animate = new myPlugin.Animate({
		total:300,
		begin:{
			height
		},
		end:{
			height:0
		},
		onmove:function(){
			div.style.height = this.curData.height + "px";
		},
		onover:function(){
			div.classList.remove("active");
		}
	});
	animate.start();
	
}

//为div做动画----出现动画
function showDiv(div) {
    div.classList.add("active");
    div.style.height = 0;
    var targetHeigth = div.children.length * aHeight;
    // console.log(targetHeigth);

    var animate = new myPlugin.Animate({
        total: 300,
        begin: {
            height: 0
        },
        end: {
            height: targetHeigth
        },
        onmove: function() {
            div.style.height = this.curData.height + "px";
        }
    });

    animate.start();
}