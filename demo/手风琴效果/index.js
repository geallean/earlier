var container  = document.querySelector(".container");

//事件委托
container.onclick = function(e){
	if(e.target.tagName == "H2"){
		//1.去掉当前具有active样式的div
		var before = container.querySelector(".active");
		if(before){
			before.classList.remove("active");
		}
		//2.给当前的h2元素后面的div加上active
		var div = e.target.nextElementSibling;
		div.classList.add("active");
		div.style.height = 0;
	}
}