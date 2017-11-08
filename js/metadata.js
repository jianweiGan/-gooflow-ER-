/**
 * 元数据
 */
var metadata = [
{
	"student": {
		"name":"学生会",
		"index":"student",
		"type":"student",
		"properties": {
			"id": {
				"des":"id"
			},
			"name": {
				"des":"姓名"
			},
			"title": {
				"des":"职务"
			},
			"phone": {
				"des":"电话"
			},
			"email": {
				"des":"邮箱"
			}
		}
	}
},
{
	"computer": {
		"name":"计算机社团",
		"index":"computer",
		"type":"computer",
		"properties": {
			"id": {
				"des":"id"
			},
			"name": {
				"des":"姓名"
			},
			"title": {
				"des":"职务"
			},
			"phone": {
				"des":"电话"
			},
			"email": {
				"des":"邮箱"
			}
		}
	}
},
{
	"RedCross": {
		"name":"红十字会",
		"index":"RedCross",
		"type":"RedCross",
		"properties": {
			"id": {
				"des":"id"
			},
			"name": {
				"des":"姓名"
			},
			"title": {
				"des":"职务"
			},
			"phone": {
				"des":"电话"
			},
			"email": {
				"des":"邮箱"
			}
		}
	}
}
];

var test_1_obj = {
	"baseinfo":{
		"taskId":"123",
		"taskName":"测试一",
		"taskDir":"c:/",
		"taskDes":"这是一个测试SQL语句执行的对象"
	},
	"scriptDef":{
		"dataBaseCon":"MySQL",
		"execType":"执行SQL代码块",
		"execScript":"select * from test"
	}
}
