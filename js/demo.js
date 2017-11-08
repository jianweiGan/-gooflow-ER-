/**
 *模型分析
 */

/**模型计数器*/
var modelCounter = 0; //模型总数
//每种模型的数量
var sqlModelCounter = 0;
var variableSetModelCounter = 0;
var workFlowModelCounter = 0;
var storeProcessModelCounter = 0;
var outerProcedureModelCounter = 0;
var waitForTimeModelCounter = 0;
var terminateModelCounter = 0;
var waitForFinishModelCounter = 0;
var conditionjudgeModelCounter = 0;
var dataExtraModelCounter = 0;
var exportTextModelCounter = 0;
var mailModelCounter = 0;
var execKettleModelCounter = 0;
var reviewFileModelCounter = 0;
var successModelCounter = 0;
var execJSModelCounter = 0;

/**
 * 初始化一个jsPlumb实例
 */
var instance = jsPlumb.getInstance({
	DragOptions: { cursor: "pointer", zIndex: 2000 },
	ConnectionOverlays: [ //附加到每个连接的默认重叠
		["Arrow", {
			location: 1,
			visible: true,
			width: 11,
			length: 11,
			direction: 1,
			id: "arrow_forwards"
		}],
		["Arrow", {
			location: 0,
			visible: false, //单向箭头
			width: 11,
			length: 11,
			direction: -1,
			id: "arrow_backwards"
		}],
		["Label", {
			location: 0.5,
			id: "label",
			cssClass: "aLabel"
		}]
	],
	Container: "container" //设置父级的元素，一个DOM容器
});
//端点样式设置
var hollowCircle = {
	endpoint: ["Dot", { cssClass: "endpointcssClass" }, { radius: "10px" }], //端点形状
	connectorStyle: connectorPaintStyle,
	paintStyle: { fill: "#62A8D1", radius: 5 }, //端点的颜色样式
	//	paintStyle: { strokeWidth: 0.1, stroke: "#ffa500", "dashstyle": "0 4", fillStyle: "transparent", }, //连接线端点的颜色样式
	isSource: true, //是否可拖动（作为连接线起点）
	connector: ["Straight", { stub: [0, 0], gap: 10, coenerRadius: 5, alwaysRespectStubs: true, midpoint: 0.5 }], //连接线形状
	isTarget: true, //是否可以放置（连接终点）
	maxConnections: -1, //最大连接数
};
var exampleDropOptions = {
	hoverClass: "dropHover", //释放时指定鼠标停留在该元素上使用的css class  
	activeClass: "dragActive" //可拖动到的元素使用的css class  
};
var targetAnchors = [
	[0.6, 0, 0, -1],
	[1, 0.6, 1, 0],
	[0.4, 1, 0, 1],
	[0, 0.4, -1, 0]
];
//基本连接线样式
var connectorPaintStyle = {
	stroke: "#62A8D1",
	//	fillStyle: "transparent",
	strokeWidth: 5
};
instance.importDefaults({
	ConnectionsDetachable: true,
	ReattachConnections: true
});

//设置连接Label的label

function init(conn) {
	var label_text;
	//$("#select_sourceList").empty();
	//$("#select_targetList").empty();
	var sourceName = $("#" + conn.sourceId).attr("modelType");
	var targetName = $("#" + conn.targetId).attr("modelType");
	for(var i = 0; i < metadata.length; i++) {
		for(var obj in metadata[i]) {
			if(obj == sourceName) {
				var optionStr = getOptions(metadata[i][obj].properties, metadata[i][obj].name);
				$("#select_sourceList").append(optionStr);
			} else if(obj == targetName) {
				var optionStr = getOptions(metadata[i][obj].properties, metadata[i][obj].name);
				$("#select_targetList").append(optionStr);
			}
		}
	}
	$("#submit_label").unbind("click");
	$("#submit_label").on("click", function() {
		setlabel(conn);
	});

}
/**
 * 获取option
 * @param obj
 * @returns {String}
 */
function getOptions(obj, head) {
	var str = "";
	for(var v in obj) {
		if(obj[v].properties == undefined) {
			var val = head + '.' + obj[v].des;
			str += '<option value="' + val + '">' +
				val +
				'</option>';
		} else {
			str += arguments.callee(obj[v].properties, head);
		}
	}
	return str;
}
//setlabel
function setlabel(conn) {
	conn.getOverlay("label").setLabel($("#select_sourceList").val() +
		' ' +
		$("#select_comparison").val() +
		' ' +
		$("#select_targetList").val());
	if($("#twoWay").val() == "true") {
		conn.setParameter("twoWay", true);
	} else {
		conn.setParameter("twoWay", false);
		conn.hideOverlay("arrow_backwards");
	}
}
//删除节点
function removeElement(obj) {
	var element = $(obj).parents(".model");
	if(confirm("确定删除该模型？"))
		instance.remove(element);
}
/**
 * 设置左边菜单
 * @param Data
 */
function setLeftMenu() {
	$("#leftMenu li").draggable({
		helper: "clone",
		scope: "plant"
	});
	$("#container").droppable({
		scope: "plant",
		drop: function(event, ui) {
			CreateModel(ui, $(this));
		}
	});
}
/**
 * 添加模型
 * @param ui
 * @param selector
 */
function CreateModel(ui, selector) {
	var modelId = $(ui.draggable).attr("id");
	modelCounter++;
	var id = modelId + "_model_" + modelCounter;
	var type = $(ui.draggable).attr("model_type");
	if(type == "ExcuteSQL") {
		sqlModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：执行SQL' + sqlModelCounter + '&#10节点类型：执行SQL&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			//			'<text class="s-text" x="16" y="47" text-anchor="middle">执行SQL0</text>'+
			'<image width="40" height="40" x="4" y="4" src="img/svg/icon_type_2.png"></image>' + '<br/>' +
			'</g>');
	}
	if(type == "VariableSetting") {
		variableSetModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：变量设置' + variableSetModelCounter + '&#10节点类型：变量设置&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_3.png"></image>' +
			'</g>');
	}
	if(type == "WorkFlow") {
		workFlowModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：作业流程' + workFlowModelCounter + '&#10节点类型：作业流程&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_4.png"></image>' +
			'</g>');
	}
	if(type == "StoreProcess") {
		storeProcessModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：存储过程' + storeProcessModelCounter + '&#10节点类型：存储过程&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_5.png"></image>' +
			'</g>');
	}
	if(type == "OuterProcedure") {
		outerProcedureModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：外部程序' + outerProcedureModelCounter + '&#10节点类型：外部程序&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_6.png"></image>' +
			'</g>');
	}
	if(type == "WaitForTime") {
		waitForTimeModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：等待时间' + waitForTimeModelCounter + '&#10节点类型：等待时间&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_g.png"></image>' +
			'</g>');
	}
	if(type == "Terminate") {
		terminateModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：中止' + terminateModelCounter + '&#10节点类型：中止&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_i.png"></image>' +
			'</g>');
	}
	if(type == "WaitForFinish") {
		waitForFinishModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：等待完成' + waitForFinishModelCounter + '&#10节点类型：等待完成&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_l.png"></image>' +
			'</g>');
	}
	if(type == "ConditionJudge") {
		conditionjudgeModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：条件判断' + conditionjudgeModelCounter + '&#10节点类型：条件判断&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_c.png"></image>' +
			'</g>');
	}
	if(type == "DataExtra") {
		dataExtraModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：数据提取' + dataExtraModelCounter + '&#10节点类型：数据提取&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_1.png"></image>' +
			'</g>');
	}
	if(type == "ExportText") {
		exportTextModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：导出文档' + exportTextModelCounter + '&#10节点类型：导出文档&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_8.png"></image>' +
			'</g>');
	}
	if(type == "Mail") {
		mailModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：邮件' + mailModelCounter + '&#10节点类型：邮件&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_9.png"></image>' +
			'</g>');
	}
	if(type == "ExecKettle") {
		execKettleModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：执行kettle' + execKettleModelCounter + '&#10节点类型：执行kettle&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_10.png"></image>' +
			'</g>');
	}
	if(type == "ReviewFile") {
		reviewFileModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：检查文件' + reviewFileModelCounter + '&#10节点类型：检查文件&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_f.png"></image>' +
			'</g>');
	}
	if(type == "Success") {
		successModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：成功' + successModelCounter + '&#10节点类型：成功&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_u.png"></image>' +
			'</g>');
	}
	if(type == "ExecJS") {
		execJSModelCounter++;
		$(selector).append('<g ondblclick="ShowEditNodeDialog(this)"  title="节点名称：执行JavaScript' + execJSModelCounter + '&#10节点类型：执行JavaScript&#10任务编号：&#10任务名称：&#10" id="' + id +
			'" model_type="' + type + '">' +
			'<image width="64" height="64" x="4" y="4" src="img/svg/icon_type_11.png"></image>' +
			'</g>');
	}
	var left = parseInt(ui.offset.left - $(selector).offset().left);
	var top = parseInt(ui.offset.top - $(selector).offset().top);
	$("#" + id).css("position", "absolute").css("left", left).css("top", top);
	//添加连接点
	//	instance.addEndpoint(id, { anchors: ["Continuous", { faces: ["top", "left", "right", "bottom"] }] }, hollowCircle);
	//instance.addEndpoint(id, { anchors: targetAnchors }, hollowCircle);
	//		jsPlumb.addEndpoint(id, {
	//			endpoint: "Dot",
	//			anchor: ["Perimeter", { shape: "Square", anchorCount: 150 }]
	//		});
	//	instance.addEndpoint(id, { anchors: "Left" }, hollowCircle);
	//	instance.addEndpoint(id, { anchors: "Right" }, hollowCircle);
	//	instance.addEndpoint(id, { anchors: "Top" }, hollowCircle);
	//	instance.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
	instance.addEndpoint(id, { anchors: "Center" }, hollowCircle);
	//注册实体可draggable
	$("#" + id).draggable({
		containment: "parent",
		drag: function(event, ui) {
			instance.repaintEverything();
		},
		stop: function() {
			instance.repaintEverything();
		}
	});
}

var isShowContext = false;
var currentObj = null; //唤起右键菜单的svg节点
function CreateContextMenu(selector, currentNode) {
	if(isShowContext == false) {
		currentObj = currentNode;
		var id = "contextModelID";
		var contextMenu = "";
		//		contextMenu += '<div id=' + id + '>' +
		//			'<h5>' + '<label>编辑当前节点</label>' + '<a href="#" class="pull-right"  style="float:right" onclick="CloseContextMenu();">X</a>' + '</h5>' +
		//			'<li style="border: solid 3px red;border-bottom-width: 1px">' + '<a href="#">' + '剪切' + '</a>' + '</li>' +
		//			'<li style="border-bottom-width: 2px">' + '<a href="#">' + '复制' + '</a>' + '</li>' +
		//			'<li style="border-bottom-width: 2px">' + '<a href="#">' + '粘贴' + '</a>' + '</li>' +
		//			'<li style="border-bottom-width: 2px">' + '<a href="#" onclick="DeleteCurrentObj()">' + '删除' + '</a>' + '</li>' +
		//			'<li style="border-bottom-width: 2px">' + '<a href="#">' + '粘贴' + '</a>' + '</li>' +
		//			'</div>';

		$(currentObj).append('<div   width="100px" height="100px" class="model" id="' + id + '">' +
			getContextStr() + '</div>');

		function getContextStr() {
			var list = '';
			list += '<h4 width="50px" height="50px"><span>' +
				'编辑节点' +
				'</span><a href="javascript:void(0)" class="pull-right" onclick="CloseContextMenu();">X</a>' +
				'</h4>';
			list += '<ul>'
			list += AddFunction();
			list += '</ul>';
			return list;
		}

		//$(selector).append(contextMenu);
		//		var left = parseInt($(currentNode).offset().left - $(selector).offset().left);
		//		var top = parseInt($(currentNode).offset().top - $(selector).offset().top);
		//		var left = getLeft(currentObj) ;
		//		var top = getTop(currentObj);
		$("#" + id).css("position", "absolute").css("left", 50).css("top", 50);
		isShowContext = true;
	}
}
//获取元素的纵坐标 
function getTop(e) {
	var offset = e.offsetTop;
	if(e.offsetParent != null) offset += getTop(e.offsetParent);
	return offset;
}
//获取元素的横坐标 
function getLeft(e) {
	var offset = e.offsetLeft;
	if(e.offsetParent != null) offset += getLeft(e.offsetParent);
	return offset;
}

function CloseContextMenu() {
	var element = $("#contextModelID");
	instance.remove(element);
	instance.repaintEverything();
	isShowContext = false;
	$("#contextModelID").remove();
	var s = instance.getConnections();
	var a = s[0];
	console.log(a);
}

function DeleteCurrentObj() {
	if(confirm("确定删除该模型吗？")) {
		instance.remove(currentObj);
		var element = $("#contextModelID");
		instance.remove(element);
		instance.repaintEverything();
		isShowContext = false;
		$("#contextModelID").remove();
	}
}

/**
 * 创建模型内部元素
 * @param type
 * @returns {String}
 */
function getModelElementStr(type) {
	var list = '';
	for(var data in metadata) {
		for(var data_type in metadata[data]) {
			var model_data = metadata[data][data_type];
			if(type == model_data.type) {
				list += '<h4><span index="' +
					model_data.index + '">' +
					model_data.name +
					'</span><a href="javascript:void(0)" class="pull-right" onclick="removeElement(this);">X</a>' +
					'</h4>';
				list += '<ul>'
				var properties = model_data.properties;
				list += parseProperties(properties);
				list += '</ul>';
			}
		}
	}
	return list;
}
/**
 * 循环遍历properties
 * @param obj
 * @returns {String}
 */
function AddFunction() { //为右键弹出菜单添加点击函数
	var str = "";
	str += '<li><a href="#" onclick="DeleteCurrentObj()">复制</a>' + '</li>';
	str += '<li><a href="#" onclick="DeleteCurrentObj()">剪切</a>' + '</li>';
	str += '<li><a href="#" onclick="DeleteCurrentObj()">粘贴</a>' + '</li>';
	str += '<li><a href="#" onclick="DeleteCurrentObj()">删除</a>' + '</li>';
	str += '<li><a href="#" onclick="DeleteCurrentObj()">编辑</a>' + '</li>';
	return str;
}

function ShowEditNodeDialog(svgNode) {
	var g_node = svgNode;
	var type = $(g_node).attr("model_type");
	var titleString = $(g_node).attr("title");
	var endIndex = titleString.indexOf("节点类型");
	var nodeName = titleString.substring(5, endIndex - 1)
	var parentNodeID = $(g_node).attr("id");
	if(type == "ExcuteSQL") {
		$("#execSqlModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#execSqlModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		var test = $("#execSqlModal").find('input').eq(0).val();
		$("#execSqlModal").dialog('open');
	}
	if(type == "VariableSetting") {
		$("#variableSetModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#variableSetModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#variableSetModal").dialog('open');
	}
	if(type == "WorkFlow") {
		$("#workFlowModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#workFlowModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#workFlowModal").dialog('open');
	}
	if(type == "StoreProcess") {
		$("#storeProcessModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#storeProcessModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#storeProcessModal").dialog('open');
	}
	if(type == "OuterProcedure") {
		$("#outerProcedureModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#outerProcedureModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#outerProcedureModal").dialog('open');
	}
	if(type == "WaitForTime") {
		$("#waitForTimeModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#waitForTimeModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#waitForTimeModal").dialog('open');
	}
	if(type == "Terminate") {
		$("#terminateModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#terminateModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#terminateModal").dialog('open');
	}
	if(type == "WaitForFinish") {
		$("#waitForFinishModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#waitForFinishModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#waitForFinishModal").dialog('open');
	}
	if(type == "ConditionJudge") {
		$("#conditionJudgeModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#conditionJudgeModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#conditionJudgeModal").dialog('open');
	}
	if(type == "DataExtra") {
		$("#dataExtraModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#dataExtraModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#dataExtraModal").dialog('open');
	}
	if(type == "ExportText") {
		$("#exportTextModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#exportTextModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#exportTextModal").dialog('open');
	}
	if(type == "Mail") {
		$("#mailModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#mailModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#mailModal").dialog('open');
	}
	if(type == "ExecKettle") {
		$("#execKettleModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#execKettleModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#execKettleModal").dialog('open');
	}
	if(type == "ReviewFile") {
		$("#reviewFileModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#reviewFileModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#reviewFileModal").dialog('open');
	}
	if(type == "Success") {
		$("#successModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#successModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#successModal").dialog('open');
	}
	if(type == "ExecJS") {
		$("#execJSModal").attr("parentNodeID", parentNodeID); //为每一个打开的对话框，在其自身的属性中存储其父对象（打开它的node）的Id
		$("#execJSModal").find('input').eq(0).val(nodeName); //获取id为execSqlModal的元素下的第一个input元素
		$("#execJSModal").dialog('open');
	}
}

function Rect() {
	this.doc = document.documentElement;
	if(!this.doc) return;
	this.startX = '';
	this.startY = '';
	this.rect = null;
	rectSelf = this;
}
Rect.prototype.down = function(e) {
	var img = e.originalTarget.tagName;
	if(img == "circle") {
		rectSelf.showRect(false);
		return;
	}
	if(img == "LI") {
		rectSelf.showRect(false);
		return;
	}
	if(img == "IMG") {
		rectSelf.showRect(false);
		return;
	}
	var e = e ? e : window.event;
	rectSelf.startX = e.clientX ? e.clientX + document.body.scrollLeft : e.pageX;
	rectSelf.startY = e.clientY ? e.clientY + document.body.scrollTop : e.pageY;
	rectSelf.showRect(true);
}
Rect.prototype.up = function(e) {
	rectSelf.rectBox.style.width = '0px';
	rectSelf.rectBox.style.height = '0px';
	rectSelf.showRect(false);
}
Rect.prototype.move = function(e) {

	if(rectSelf.rectBox) {
		var currentX = e.clientX ? e.clientX + rectSelf.doc.scrollLeft : e.pageX;
		var currentY = e.clientY ? e.clientY + rectSelf.doc.scrollTop : e.pageY;
		rectSelf.rectBox.style.width = Math.abs(currentX - rectSelf.startX) + 'px';
		rectSelf.rectBox.style.height = Math.abs(currentY - rectSelf.startY) + 'px';
		if(currentX - rectSelf.startX < 0) {
			rectSelf.rectBox.style.left = currentX + 'px';
		}
		if(currentY - rectSelf.startY < 0) {
			rectSelf.rectBox.style.top = currentY + 'px';
		}
		//document.title = "left:"+currentX + 'px '+"top:"+currentY + 'px ';
	}
}
Rect.prototype.showRect = function(bool) {
	if(bool) {
		if(!this.rectBox) {
			this.rectBox = document.createElement("div");
			this.rectBox.id = "rectBox";
			document.body.appendChild(this.rectBox);
		}
		this.rectBox.style.display = "block";
		this.rectBox.style.left = this.startX + 'px';
		this.rectBox.style.top = this.startY + 'px';
		this.addEventListener(this.doc, 'mousemove', this.move);
	} else {
		if(this.rectBox) {
			this.rectBox.style.display = "none";
		}
		this.removeEventListener(this.doc, 'mousemove', this.move);
	}
}
Rect.prototype.addEventListener = function(o, e, l) {
	if(o.addEventListener) {
		o.addEventListener(e, l, false);
	} else if(o.attachEvent) {
		o.attachEvent('on' + e, function() {
			l(window.event);
		});
	}
}
Rect.prototype.removeEventListener = function(o, e, l) {
	if(o.removeEventListener) {
		o.removeEventListener(e, l, false);
	} else if(o.detachEvent) {
		o.detachEvent('on' + e, function() {
			l(window.event);
		});
	}
}