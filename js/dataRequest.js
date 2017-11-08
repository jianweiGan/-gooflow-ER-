var provinceList ={
    '福建省':{
            '福州市' :['鼓楼区','台江区','仓山区','马尾区','晋安区','闽侯县','连江县','罗源县','闽清县','永泰县','平潭县','福清市','长乐市'],
            '厦门市' :['思明区','海沧区','湖里区','集美区','同安区','翔安区'],
            '莆田市' :['城厢区','涵江区','荔城区','秀屿区','仙游县']},
            '三明市' :['梅列区','三元区','明溪县','清流县','宁化县','大田县','尤溪县','沙县','将乐县','泰宁县','建宁县','永安市'],
            '泉州市' :['鲤城区','丰泽区','洛江区','泉港区','惠安县','安溪县','永春县','德化县','金门县','石狮市','晋江市','南安市'],
            '漳州市' :['芗城区','龙文区','云霄县','漳浦县','诏安县','长泰县','东山县','南靖县','平和县','华安县','龙海市'],
            '南平市' :['延平区','顺昌县','浦城县','光泽县','松溪县','政和县','邵武市','武夷山市','建瓯市','建阳市'],
            '龙岩市' :['新罗区','长汀县','永定县','上杭县','武平县','连城县','漳平市'],
            '宁德市' :['蕉城区','霞浦县','古田县','屏南县','寿宁县','周宁县','柘荣县','福安市','福鼎市']
    };
var codeMap = {
    350000: ['350100','350200','350300','350400','350500','350600','350700','350800','350900'],
    350100: ['350101','350102','350103','350104','350105','350111','350121','350122','350123','350124','350125','350128','350181','350182']
};
var years = ['2017','2016','2015'];
// var dataByArea = {
//     2017:[],
//     2016:[],
//     permissionStatus2017: [],
//     permissionStatus2016: [],
//     acceptStatus2017: [],
//     acceptStatus2016: [],
//     type2017: [],
//     type2016: [],
//     month2017: [],
//     month2016: []
// };
var dataBar = {};
var dataPermission = {};
var dataAccpet = {};
var dataType = {};
var dataMonth = {};
function DataRequest(areaCode,year) {
        var url="http://localhost:8080/fujian-demo/service/RoadPermissionService";
        var p = new SOAPClientParameters();
        p.add("area", areaCode);
        p.add("year", year);
        SOAPClient.explicitNS = true;
        SOAPClient.invoke(url, "permission", p, false, Data_callBack);
        function Data_callBack(r) {
            dataBar[year] = [];
            dataPermission[year] = [];
            dataAccpet[year] = [];
            dataMonth[year] = [];
            for (var i = 0; i < codeMap[areaCode].length; i++) {
                var code = codeMap[areaCode][i];
                var account = 0;
                var permissionAccount = 0;
                var permissionNotAccount = 0;
                var acceptAccount = 0;
                var acceptNotAccount = 0;
                var JanAccount = 0;
                var FebAccount = 0;
                var MarAccount = 0;
                var AprAccount = 0;
                var MayAccount = 0;
                var JunAccount = 0;
                var JulAccount = 0;
                var AugAccount = 0;
                var SepAccount = 0;
                var OctAccount = 0;
                var NovAccount = 0;
                var DceAccount = 0;
                for (var j = 0; j < r.length; j++) {
                    //统计市
                    if (code%100 == 0 && (r.areaCode/100) == code/100) {
                        account += r[j].total;
                        if (r[j].permissionStatus == "true") {permissionAccount += parseInt(r[j].total);}
                        if (r[j].permissionStatus == "false") {permissionNotAccount += parseInt(r[j].total);}
                        if (r[j].acceptStatus == "true") {acceptAccount += parseInt(r[j].total);}
                        if (r[j].acceptStatus == "false") {acceptNotAccount += parseInt(r[j].total);}
                        if (r[j].month == '1') {JanAccount += parseInt(r[j].total);}
                        if (r[j].month == '2') {FebAccount += parseInt(r[j].total);}
                        if (r[j].month == '3') {MarAccount += parseInt(r[j].total);}
                        if (r[j].month == '4') {AprAccount += parseInt(r[j].total);}
                        if (r[j].month == '5') {MayAccount += parseInt(r[j].total);}
                        if (r[j].month == '6') {JunAccount += parseInt(r[j].total);}
                        if (r[j].month == '7') {JulAccount += parseInt(r[j].total);}
                        if (r[j].month == '8') {AugAccount += parseInt(r[j].total);}
                        if (r[j].month == '9') {SepAccount += parseInt(r[j].total);}
                        if (r[j].month == '10') {OctAccount += parseInt(r[j].total);}
                        if (r[j].month == '11') {NovAccount += parseInt(r[j].total);}
                        if (r[j].month == '12') {DecAccount += parseInt(r[j].total);}

                    }
                    //统计某个市的区
                    if (code%100 != 0 && r.areaCode == code) {
                        account += r[j].total;
                        if (r[j].permissionStatus == "true") {permissionAccount += parseInt(r[j].total);}
                        if (r[j].permissionStatus == "false") {permissionNotAccount += parseInt(r[j].total);}
                        if (r[j].acceptStatus == "true") {acceptAccount += parseInt(r[j].total);}
                        if (r[j].acceptStatus == "false") {acceptNotAccount += parseInt(r[j].total);}
                        if (r[j].month == '1') {JanAccount += parseInt(r[j].total);}
                        if (r[j].month == '2') {FebAccount += parseInt(r[j].total);}
                        if (r[j].month == '3') {MarAccount += parseInt(r[j].total);}
                        if (r[j].month == '4') {AprAccount += parseInt(r[j].total);}
                        if (r[j].month == '5') {MayAccount += parseInt(r[j].total);}
                        if (r[j].month == '6') {JunAccount += parseInt(r[j].total);}
                        if (r[j].month == '7') {JulAccount += parseInt(r[j].total);}
                        if (r[j].month == '8') {AugAccount += parseInt(r[j].total);}
                        if (r[j].month == '9') {SepAccount += parseInt(r[j].total);}
                        if (r[j].month == '10') {OctAccount += parseInt(r[j].total);}
                        if (r[j].month == '11') {NovAccount += parseInt(r[j].total);}
                        if (r[j].month == '12') {DecAccount += parseInt(r[j].total);}
                }
                dataBar[year].push(account);
                dataPermission[year].push([{value:permissionAccount,name:'许可'},{value:permissionNotAccount,name:'未许可'}]);
                dataAccept[year].push([{value:acceptAccount,name:'受理'},{value:acceptNotAccount,name:'未受理'}]);
                dataMonth[year].push([
                {value:JanAccount, name:'1月份'},
                {value:FebAccount, name:'2月份'},
                {value:MarAccount, name:'3月份'},
                {value:AprAccount, name:'4月份'},
                {value:MayAccount, name:'5月份'},
                {value:JunAccount, name:'6月份'},
                {value:JulAccount, name:'7月份'},
                {value:AugAccount, name:'8月份'},
                {value:SepAccount, name:'9月份'},
                {value:OctAccount, name:'10月份'},
                {value:NovAccount, name:'11月份'},
                {value:DecAccount, name:'12月份'}
               ]);
            }
        }
    }
}
function DataRequestByType(areaCode) {
    var url="http://localhost:8080/fujian-demo/service/RoadPermissionService";
    var p = new SOAPClientParameters();
    p.add("area", areaCode);
    SOAPClient.explicitNS = true;
    SOAPClient.invoke(url, "permission", p, false, DataType_callBack);
    function DataType_callBack(r) {
            for (var i = 0; i < codeMap[areaCode].length; i++) {
                var type1 = 0;
                var type2 = 0;
                var type3 = 0;
                var type4 = 0;
                var type5 = 0;
                var type6 = 0;
                var type7 = 0;
                var type8 = 0;
                var type9 = 0;
                var type10 = 0;
                var type11= 0;
                for (var k = 0; k < years.length; k++) {
                    for (var j = 0; j < r.length; j++) {
                        //统计市
                        if (code%100 == 0 && (r.areaCode/100) == code/100) {
                            if (r.year == years[j] && r.typeName == '非标') {type1 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '占用挖掘') {type2 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '穿跨越或埋设管线') {type3 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '建筑控制区埋设管线等') {type4 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '超限运输') {type5 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '因铁路、水利等建设使国省道改线') {type6 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '更新砍伐树木') {type7 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '增设平交道口') {type7 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '建(构)筑物') {type9 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '分流或中断交通') {type10 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '其他') {type11 += parseInt(r.total);}
                        }
                        //统计某个市的区
                        if (code%100 != 0 && r.areaCode == code) {
                            if (r.year == years[j] && r.typeName == '非标') {type1 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '占用挖掘') {type2 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '穿跨越或埋设管线') {type3 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '建筑控制区埋设管线等') {type4 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '超限运输') {type5 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '因铁路、水利等建设使国省道改线') {type6 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '更新砍伐树木') {type7 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '增设平交道口') {type7 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '建(构)筑物') {type9 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '分流或中断交通') {type10 += parseInt(r.total);}
                            if (r.year == years[j] && r.typeName == '其他') {type11 += parseInt(r.total);}
                    }
                     datType[years[k]].push([
                     {value:type1, name:'非标'},
                     {value:type2, name:'占用挖掘'},
                     {value:type3, name:'穿跨越或埋设管线'},
                     {value:type4, name:'建筑控制区埋设管线等'},
                     {value:type5, name:'超限运输'},
                     {value:type6, name:'因铁路、水利等建设使国省道改线'},
                     {value:type7, name:'更新砍伐树木'},
                     {value:type8, name:'增设平交道口'},
                     {value:type9, name:'建(构)筑物'},
                     {value:type10, name:'分流或中断交通'},
                     {value:type11, name:'其他'},
                    ]);
                }
            }
        }
    }
}
DataRequest("350000","2017");