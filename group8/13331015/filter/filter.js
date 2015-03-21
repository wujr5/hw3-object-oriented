window.onload = function() {
	var tables = getAllTables();
	// makeAllTablesSortable(tables);
	// makeAllTablesFilterable(tables);
	for (var i = 0; i < tables.length; i++) {
		makeSortable(makeFilterable(tables[i]));
	}
}
function getAllTables() { //从document对象中得到所有的table
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) { //变成sortable
	for (var i = tables.length - 1; i >= 0; i--) {
		makeSortable(tables[i]);
	}
}

function makeSortable(table) {
	var ths = table.getElementsByTagName('th');
	for (var foo = ths.length - 1; foo >= 0; foo--) {
		ths[foo].addEventListener('click', toSort_ascending);
	}
	return table;
}

function toSort_ascending(event) { //升序排序
	var sorted_Table = this.parentNode.parentNode.parentNode; //得到点击所在的table
	var ths = sorted_Table.getElementsByTagName('th');
	reset_Other_Th(ths); //重置此table其他表头单元格的状态

	var th_pos = -1; //所点击的栏目位置
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}

	var trs = sorted_Table.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		if (trs[i].className.search("invisibility") != -1)
			trs = trs.splice(i, 1);
	}
	for (var j = 1; j < trs.length-1; j++) { //冒泡排序
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue > tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2); //互换
			}
		}
	}

	//给所点击的表头单元格的className赋值，从而改变样式
	this.className = "up";
	//移除升序的事件发生器，添加降序的事件发生器
	this.removeEventListener('click', toSort_ascending);
	this.addEventListener('click', toSort_descending);
}

function toSort_descending(event) { //降序排序
	var sorted_Table = this.parentNode.parentNode.parentNode; //得到点击所在的table
	var ths = sorted_Table.getElementsByTagName('th');

	var th_pos = -1; //所点击的栏目位置
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}

	var trs = sorted_Table.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		if (trs[i].className.search("invisibility") != -1)
			trs = trs.splice(i, 1);
	}

	for (var j = 1; j < trs.length-1; j++) { //冒泡排序
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue < tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2); //互换
			}
		}
	}

	//给所点击的表头单元格的className赋值，从而改变样式
	this.className = "down";
	//移除降序的事件发生器，添加升序的事件发生器
	this.removeEventListener('click', toSort_descending);
	this.addEventListener('click',toSort_ascending);
}

function reset_Other_Th(ths) { //重置表头单元格的状态
	for (var i = ths.length - 1; i >= 0; i--) {
		ths[i].className = ""; //把单元格的className赋为空，从而实现从高亮样式变回原状态样式的效果
		ths[i].removeEventListener('click', toSort_descending);
		ths[i].addEventListener('click',toSort_ascending);
	}
}

function tr_Exchang(tds_1, tds_2) { //互换td的文本内容
	var len = tds_1.length;
	for (var i = 0; i < len; i++) {
		var tmp = tds_1[i].firstChild.nodeValue;
		tds_1[i].firstChild.nodeValue = tds_2[i].firstChild.nodeValue;
		tds_2[i].firstChild.nodeValue = tmp;
	}
}




function makeAllTablesFilterable(tables) { //变成filterable
	for (var i = tables.length - 1; i >= 0; i--) {
		makeFilterable(tables[i]);
	}
}

function makeFilterable (table) {
	var input = document.createElement("input");
	table.parentNode.insertBefore(input, table); //添加输入框在table之前
	input.addEventListener('input', filter);
	return table;
}

function filter(event) {
	var filter_table = this.nextSibling; //得到所在的table
	var trs = filter_table.tBodies[0].rows; //得到tbody里面所有的tr
	for (var i = 0; i < trs.length; i++) {
		trs[i].className = trs[i].className.replace(/ invisibility/g, ""); // 恢复表格原始状态
		trs[i].innerHTML = trs[i].innerHTML.replace(/<strong>|<\/strong>/g, "");
		if ("" == this.value) continue;// 空白不查询
		var tds = trs[i].cells; //得到一个tr中的所有td
		var is_Exist_Keyword = false;
		for (var j = 0; j < tds.length; j++) {
			if (tds[j].innerText.search(this.value) != -1) {
				tds[j].innerHTML = tds[j].innerHTML.replace(new RegExp(this.value,"g"), "<strong>" + this.value + "</strong>");
				is_Exist_Keyword = true;
			}
		}
		if (!is_Exist_Keyword)
			trs[i].className += " invisibility"; // 隐藏tr
	}
}
