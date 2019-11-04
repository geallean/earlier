var config = {
    count: 22, //获取的总数据的条数
    limit: 4, //每页显示多少条数据
    page: 1, //当前是第几页
    panelNumber: 5, //数字页码最多出现的个数
}

//ajax请求信息电影信息
function getData(count) {
    $.ajax({
        type: "GET",
        url: "https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a",
        data: "count=" + count,
        dataType: "jsonp",
        success: getMovie
    });
}
getData(config.count);


//AJAX的回调函数,主要用于接收到数据后的数据处理
function getMovie(data) {

    var subjects = data.subjects; //影片信息数组

    //渲染页面
    loadPage(subjects);
    //加载页码
    setPager(subjects);
}


/**
 * 循环遍历影片数组显示数据
 * @param {[type]} movie [description]
 */
function setMovieHtml(movie, page) {
    var html = "";
    for (var i = 0; i < movie.length; i++) {

        var m = movie[i]; //数组的每一项，一个电影对象
        // console.log(m);

        html += `<div class="data">
                        <div class="poster">
                            <em>${i + 1 + 4 * (page - 1)}</em>
                            <img src="${m.images.medium}" alt="海報">
                        </div>
                        <div class="info">
                            <h2 class="title">${m.title}</h2>
                            <div class="movie">
                                <span>英文名：${m.original_title}</span>
                                <span>类型：${m.genres}</span>
                                <span>上映地区：${m.pubdates}</span>
                                <span>上映时间：${m.pubdates}</span>
                                <span>时长：${m.durations}</span>
                            </div>
                        </div>
                    </div>`;
    }

    var wrap = document.getElementById("wrap");
    wrap.innerHTML = html;
}


/**
 * 指定页码，截取数组，并显示
 * @return {[type]} [description]
 */
function loadPage(movie) {
    //当前是第几页
    var page = config.page;
    //从所有数据中取出这一页需要的数据
    var moviePage = movie.slice((page - 1) * config.limit, page * config.limit);
    console.log(moviePage);
    setMovieHtml(moviePage, page);
}




/**
 * 设置页码
 * @param {[type]} movie [description]
 */
function setPager(movie) {
    //计算总页数 -- 总数据量/每页的数据量
    var totalPage = Math.ceil(config.count / config.limit);
    var divPager = document.getElementById("pager");
    divPager.innerHTML = ""; //先把内容区域清空


    function load(movie) {
        loadPage(movie); //重新加载数据区域
        setPager(movie); //重新设置页码区域
    }

    if (config.page == 1) {
        //当前是第一页
        createPager("首页", "first disabled");
        createPager("上一页", "pre disabled");
    } else {
        //当前不是第一页
        var first = createPager("首页", "first");
        var pre = createPager("上一页", "pre");

        //点击首页
        first.onclick = function() {
            config.page = 1; //设置当前页码为1
            load(movie);
        }
        //点击上一页
        pre.onclick = function() {
            config.page--;
            load(movie);
        }
    }


    //数字页码
    var min = config.page - Math.floor(config.panelNumber / 2);
    if (min < 1) {
        min = 1; //最小页码为1
    }
    var max = min + config.panelNumber - 1; //最大页码
    if (max > totalPage) {
        max = totalPage; //最大页码必须为总页数
        min = max - config.panelNumber +1;
    }
    for (var i = min; i <= max; i++) {
        if (i == config.page) {
            createPager(i, "number active");
        } else {
            var a = createPager(i, "number");
            a.onclick = function() {
                //当点击的时候循环早就结束了，所以i是循环结束后的值
                var page = parseInt(this.innerText); //拿到a元素内的文本
                config.page = page; //将config.page修改为当前的这一页，然后渲染
                load(movie);
            }

        }

    }



    //下一页和尾页
    if (config.page == totalPage) {
        console.log(1);
        //当前是最后一页
        createPager("下一页", "next disabled");
        createPager("尾页", "last disabled");
    } else {
        //当前不是最后一页
        var next = createPager("下一页", "next");
        var last = createPager("尾页", "last");

        //点击尾页
        last.onclick = function() {
            config.page = totalPage; //设置当前页码为总页数
            load(movie);
        }
        //点击下一页
        next.onclick = function() {
            config.page++;
            load(movie);
        }
    }






    //加入显示页码的span元素
    var span = document.createElement("span");
    span.innerHTML = `<i class="current">${config.page}</i> / <i class="total">${totalPage}</i>`;

    divPager.appendChild(span);



    /**
     * 创建一个页码
     * @param  {[type]} text       [a元素的内容]
     * @param  {[type]} extraClass [额外的类样式]
     * @return {[type]}            [description]
     */
    function createPager(text, extraClass) {

        //首页
        var a = document.createElement("a");
        a.className = "pager-item " + extraClass;
        a.innerText = text;
        divPager.appendChild(a);

        return a;
    }
}