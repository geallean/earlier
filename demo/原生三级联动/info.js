// 省份
    var province = [
        // 省份ID, 省份名称
        { id: 110000, name: '北京市' },
        { id: 120000, name: '天津市' },
        { id: 130000, name: '河北省' },
        { id: 140000, name: '山西省' },
        { id: 150000, name: '内蒙古自治区' },
        { id: 210000, name: '辽宁省' },
        { id: 220000, name: '吉林省' },
        { id: 230000, name: '黑龙江省' },
        { id: 310000, name: '上海市' },
        { id: 320000, name: '江苏省' }
    ];

    // 城市
    var city = [
        // 城市ID, 城市名称, 城市所属的省份（即本级的上一级的ID）
        { id: 110000, name: '北京市', province_id: 110000 },
        { id: 120000, name: '天津市', province_id: 120000 },
        { id: 320100, name: '南京市', province_id: 320000 },
        { id: 320200, name: '无锡市', province_id: 320000 },
        { id: 320300, name: '徐州市', province_id: 320000 },
        { id: 320400, name: '常州市', province_id: 320000 },
        { id: 320500, name: '苏州市', province_id: 320000 },
        { id: 320600, name: '南通市', province_id: 320000 },
        { id: 320700, name: '连云港市', province_id: 320000 },
        { id: 320800, name: '淮安市', province_id: 320000 }
    ];

    // 区县
    var area = [
        // 区县ID, 区县名称, 区县所属的城市（即本级的上一级的ID）
        { id: 110101, name: '东城区', city_id: 110000 },
        { id: 110102, name: '西城区', city_id: 110000 },
        { id: 110105, name: '朝阳区', city_id: 110000 },
        { id: 110106, name: '丰台区', city_id: 110000 },
        { id: 110107, name: '石景山区', city_id: 110000 },
        { id: 110108, name: '海淀区', city_id: 110000 },
        { id: 110109, name: '门头沟区', city_id: 110000 },
        { id: 110111, name: '房山区', city_id: 110000 },
        { id: 110112, name: '通州区', city_id: 110000 },
        { id: 110113, name: '顺义区', city_id: 110000 },
        { id: 110114, name: '昌平区', city_id: 110000 },
        { id: 110115, name: '大兴区', city_id: 110000 },
        { id: 110116, name: '怀柔区', city_id: 110000 },
        { id: 110117, name: '平谷区', city_id: 110000 },
        { id: 110118, name: '密云区', city_id: 110000 },
        { id: 110119, name: '延庆区', city_id: 110000 },
        { id: 320102, name: '玄武区', city_id: 320100 },
        { id: 320104, name: '秦淮区', city_id: 320100 },
        { id: 320105, name: '建邺区', city_id: 320100 },
        { id: 320106, name: '鼓楼区', city_id: 320100 },
        { id: 320111, name: '浦口区', city_id: 320100 },
        { id: 320113, name: '栖霞区', city_id: 320100 },
        { id: 320114, name: '雨花台区', city_id: 320100 },
        { id: 320115, name: '江宁区', city_id: 320100 },
        { id: 320116, name: '六合区', city_id: 320100 },
        { id: 320117, name: '溧水区', city_id: 320100 },
        { id: 320118, name: '高淳区', city_id: 320100 },
        { id: 320117, name: '溧水区', city_id: 320100 }
    ];