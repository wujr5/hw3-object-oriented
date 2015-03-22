window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables)
    makeAllTablesSortable(tables);
}
function getAllTables() {
	return document.getElementsByTagName('table');
}
function makeAllTablesSortable(tables) {
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
	reset_Other_Th(ths);
	var th_pos = -1;
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
	this.className = "up";
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
	this.className = "down";
	this.removeEventListener('click', toSort_descending);
	this.addEventListener('click',toSort_ascending);
}

function reset_Other_Th(ths) {
	for (var i = ths.length - 1; i >= 0; i--) {
		ths[i].className = "";
		ths[i].removeEventListener('click', toSort_descending);
		ths[i].addEventListener('click',toSort_ascending);
	}
}

function tr_Exchang(tds_1, tds_2) {
	var len = tds_1.length;
	for (var i = 0; i < len; i++) {
		var tmp = tds_1[i].firstChild.nodeValue;
		tds_1[i].firstChild.nodeValue = tds_2[i].firstChild.nodeValue;
		tds_2[i].firstChild.nodeValue = tmp;
	}
}




function makeAllTablesFilterable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		makeFilterable(tables[i]);
	}
	return tables;
}

function makeFilterable (table) {
	var input = document.createElement("input");
	table.parentNode.insertBefore(input, table);
	input.addEventListener('input', filter);
}

function filter(event) {
	var filter_table = this.nextSibling;
	var trs = filter_table.tBodies[0].rows;
	for (var i = 0; i < trs.length; i++) {
		trs[i].className = trs[i].className.replace(/ invisibility/g, "");
		trs[i].innerHTML = trs[i].innerHTML.replace(/<strong>|<\/strong>/g, "");
		if ("" == this.value) continue;
		var tds = trs[i].cells;
		var is_Exist_Keyword = false;
		for (var j = 0; j < tds.length; j++) {
			if (tds[j].innerText.search(this.value) != -1) {
				tds[j].innerHTML = tds[j].innerHTML.replace(new RegExp(this.value,"g"), "<strong>" + this.value + "</strong>");
				is_Exist_Keyword = true;
			}
		}
		if (!is_Exist_Keyword)
			trs[i].className += " invisibility";
	}
}
