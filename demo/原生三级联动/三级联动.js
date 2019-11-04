(function() {
    // console.log(province);
    // console.log(city);
    // console.log(area);

    var oProvince = document.getElementById("province");
    var oCity = document.getElementById("city");
    var oArea = document.getElementById("area");

    //遍历取数据,province
    var provincestr = "";
    for (var i = 0; i < province.length; i++) {
        provincestr += `<option value="${province[i].id}">${province[i].name}</option>`;
    }
    // console.log(provincestr);
    oProvince.innerHTML = provincestr;

    // city
    //找到对应的cityarr
    var city_arr = [];
    for (var j = 0; j < city.length; j++) {
        if (city[j].province_id == oProvince.value) {
            // console.log(city[j]);
            city_arr.push(city[j]);
        }
    }
    // console.log(city_arr);
    if (city_arr.length != 0) {
        var citystr = "";
        for (var i = 0; i < city_arr.length; i++) {
            citystr += `<option value="${city_arr[i].id}">${city_arr[i].name}</option>`;
        }
        oCity.innerHTML = citystr;
    } else {
        oCity.innerHTML = "<option>暂无数据</option>";
    }

    //地区
    var area_arr = [];
    for (var j = 0; j < area.length; j++) {
        if (area[j].city_id == oCity.value) {
            // console.log(area[j]);
            area_arr.push(area[j]);
        }
    }
    // console.log(area_arr);
    if (area_arr.length != 0) {
        var areastr = "";
        for (var i = 0; i < area_arr.length; i++) {
            areastr += `<option value="${area_arr[i].id}">${area_arr[i].name}</option>`;
        }
        oArea.innerHTML = areastr;
    } else {
        oArea.innerHTML = "<option>暂无数据</option>";
    }



    //省市联动
    oProvince.onchange = function() {
        // city
        //找到对应的cityarr
        var city_arr = [];
        for (var j = 0; j < city.length; j++) {
            if (city[j].province_id == oProvince.value) {
                city_arr.push(city[j]);
            }
        }

        if (city_arr.length != 0) {
            var citystr = "";
            for (var i = 0; i < city_arr.length; i++) {
                citystr += `<option value="${city_arr[i].id}">${city_arr[i].name}</option>`;
            }
            oCity.innerHTML = citystr;
        } else {
            oCity.innerHTML = "<option>暂无数据</option>";
        }

        //地区
        var area_arr = [];
        for (var j = 0; j < area.length; j++) {
            if (area[j].city_id == oCity.value) {
                area_arr.push(area[j]);
            }
        }

        if (area_arr.length != 0) {
            var areastr = "";
            for (var i = 0; i < area_arr.length; i++) {
                areastr += `<option value="${area_arr[i].id}">${area_arr[i].name}</option>`;
            }
            oArea.innerHTML = areastr;
        } else {
            oArea.innerHTML = "<option>暂无数据</option>";
        }
    }

    //市区联动
    oCity.onchange = function() {
        //地区
        var area_arr = [];
        for (var j = 0; j < area.length; j++) {
            if (area[j].city_id == oCity.value) {
                area_arr.push(area[j]);
            }
        }

        if (area_arr.length == 0) {
            oArea.innerHTML = "<option>暂无数据</option>";
            return;
        } else {
            var areastr = "";
            for (var i = 0; i < area_arr.length; i++) {
                areastr += `<option value="${area_arr[i].id}">${area_arr[i].name}</option>`;
            }
            oArea.innerHTML = areastr;
        }
    }


})()