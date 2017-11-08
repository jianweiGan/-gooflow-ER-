// 纯JS省市区三级联动

var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea)
{
	var cmbProvince = document.getElementById(_cmbProvince);
	var cmbCity = document.getElementById(_cmbCity);
	var cmbArea = document.getElementById(_cmbArea);

	function cmbSelect(cmb, str)
	{
		for(var i=0; i<cmb.options.length; i++)
		{
			if(cmb.options[i].value == str)
			{
				cmb.selectedIndex = i;
				return;
			}
		}
	}
	function cmbAddOption(cmb, str, obj)
	{
		var option = document.createElement("OPTION");
		cmb.options.add(option);
		option.innerHTML = str;
		option.value = str;
		option.obj = obj;
	}

	function changeCity()
	{
		cmbArea.options.length = 0;
		if(cmbCity.selectedIndex == -1)return;
		var item = cmbCity.options[cmbCity.selectedIndex].obj;
		for(var i=0; i<item.areaList.length; i++)
		{
			cmbAddOption(cmbArea, item.areaList[i], null);
		}
		cmbSelect(cmbArea, defaultArea);
	}
	function changeProvince()
	{
		cmbCity.options.length = 0;
		cmbCity.onchange = null;
		if(cmbProvince.selectedIndex == -1)return;
		var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
		for(var i=0; i<item.cityList.length; i++)
		{
			cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
		}
		cmbSelect(cmbCity, defaultCity);
		changeCity();
		cmbCity.onchange = changeCity;
	}

	for(var i=0; i<provinceList.length; i++)
	{
		cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
	}
	cmbSelect(cmbProvince, defaultProvince);
	changeProvince();
	cmbProvince.onchange = changeProvince;
};

var provinceList = [
	{name:'福建省', cityList:[
	    {name:'--市--', areaList:['--区--']},
	    {name:'福州市', areaList:['--区--','市辖区','鼓楼区','台江区','仓山区','马尾区','晋安区','闽侯县','连江县','罗源县','闽清县','永泰县','平潭县','福清市','长乐市']},
	    {name:'厦门市', areaList:['--区--','市辖区','思明区','海沧区','湖里区','集美区','同安区','翔安区']},
	    {name:'莆田市', areaList:['--区--','市辖区','城厢区','涵江区','荔城区','秀屿区','仙游县']},
	    {name:'三明市', areaList:['--区--','市辖区','梅列区','三元区','明溪县','清流县','宁化县','大田县','尤溪县','沙　县','将乐县','泰宁县','建宁县','永安市']},
	    {name:'泉州市', areaList:['--区--','市辖区','鲤城区','丰泽区','洛江区','泉港区','惠安县','安溪县','永春县','德化县','金门县','石狮市','晋江市','南安市']},
	    {name:'漳州市', areaList:['--区--','市辖区','芗城区','龙文区','云霄县','漳浦县','诏安县','长泰县','东山县','南靖县','平和县','华安县','龙海市']},
	    {name:'南平市', areaList:['--区--','市辖区','延平区','顺昌县','浦城县','光泽县','松溪县','政和县','邵武市','武夷山市','建瓯市','建阳市']},
	    {name:'龙岩市', areaList:['--区--','市辖区','新罗区','长汀县','永定县','上杭县','武平县','连城县','漳平市']},
	    {name:'宁德市', areaList:['--区--','市辖区','蕉城区','霞浦县','古田县','屏南县','寿宁县','周宁县','柘荣县','福安市','福鼎市']}
	]}
];
/*
var provinceList1 = [
    {name:'福建省', code: 350000, cityList:[
        {name:'--市--', code:       , areaList:[{name:'--区--',code:]}},
        {name:'福州市', code: 350100, areaList:[{name:'--区--',code:},{name:'市辖区',code:350101},{name:'鼓楼区',code:350102},{name:'台江区',code:350103},{name:'仓山区',code:350104},{name:'马尾区',code:350105},{name:'晋安区',code:350111},{name:'闽侯县',code:350121},{name:'连江县',code:350122},{name:'罗源县',code:350123},{name:'闽清县',code:350124},{name:'永泰县',code:350125},{name:'平潭县',code:350128},{name:'福清市',code:350181},{name:'长乐市',code:350182}]},
        {name:'厦门市', code: 350200, areaList:['--区--','市辖区','思明区','海沧区','湖里区','集美区','同安区','翔安区']},
        {name:'莆田市', code: 350300, areaList:['--区--','市辖区','城厢区','涵江区','荔城区','秀屿区','仙游县']},
        {name:'三明市', code: 350400, areaList:['--区--','市辖区','梅列区','三元区','明溪县','清流县','宁化县','大田县','尤溪县','沙　县','将乐县','泰宁县','建宁县','永安市']},
        {name:'泉州市', code: 350500, areaList:['--区--','市辖区','鲤城区','丰泽区','洛江区','泉港区','惠安县','安溪县','永春县','德化县','金门县','石狮市','晋江市','南安市']},
        {name:'漳州市', code: 350600, areaList:['--区--','市辖区','芗城区','龙文区','云霄县','漳浦县','诏安县','长泰县','东山县','南靖县','平和县','华安县','龙海市']},
        {name:'南平市', code: 350700, areaList:['--区--','市辖区','延平区','顺昌县','浦城县','光泽县','松溪县','政和县','邵武市','武夷山市','建瓯市','建阳市']},
        {name:'龙岩市', code: 350800, areaList:['--区--','市辖区','新罗区','长汀县','永定县','上杭县','武平县','连城县','漳平市']},
        {name:'宁德市', code: 350900, areaList:['--区--','市辖区','蕉城区','霞浦县','古田县','屏南县','寿宁县','周宁县','柘荣县','福安市','福鼎市']}
    ]}
]
*/
