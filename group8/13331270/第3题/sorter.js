/******************************************
In file inheritance.js
First edited by Jiarong wu on 11/4/2014
Last edited by Jiarong wu on 11/6/2014
Tel:18819473271 Email:973430584@qq.com
*******************************************/

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
//取得所有表格
function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}
//表格排序方法
function sortTables(table, iCol) {
    var ths = table.tHead.rows[0].cells;
    var tbody = table.tBodies[0];
    var colRows = tbody.rows;
    var aTrs = new Array;

    //将得到的列放入数组，备用
    for (var i=0; i < colRows.length; i++) { 
        aTrs[i] = colRows[i];  
    }

    //改变成统一样式
    for (var i = 0; i < ths.length; i++) {
        ths[i].className = "nochange";
    }

    //判断上一次排列的列和现在需要排列的是否同一个。 
    if (table.sortCol == iCol) {
        aTrs.reverse();
        
        if (ths[iCol].change == "changeAscend") {
            ths[iCol].className = "changeDescend";
            ths[iCol].change = "changeDescend";
        } else {
            ths[iCol].className = "changeAscend";
            ths[iCol].change = "changeAscend";
        }
    } else {
        aTrs.sort(compareEle(iCol));
        ths[iCol].className = "changeAscend";
        ths[iCol].change = "changeAscend";
    }

    var oFragment = document.createDocumentFragment();  

    for (var i=0; i < aTrs.length; i++) {
        oFragment.appendChild(aTrs[i]);
    }
    tbody.appendChild(oFragment);

    //记录最后一次排序的列索引 
    table.sortCol = iCol;
}

//排序函数，iCol表示列索引，dataType表示该列的数据类型  
function compareEle(iCol) {
    return  function (oTR1, oTR2) {
        var vValue1 = oTR1.cells[iCol].textContent;
        var vValue2 = oTR2.cells[iCol].textContent;
        if (vValue1 < vValue2) {
            return -1;
        } else if (vValue1 > vValue2) {
            return 1;
        } else {
            return 0;
        }
    };
}

//利用闭包，对每个表头添加鼠标点击事件
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].tHead.rows[0].cells;
        
        for (var j = 0; j < ths.length; j++) {
            ths[j].onclick = function() {
                ths[j].index = j;
                var table = tables[i];
                return function() {
                    sortTables(table, this.index);
                };
            }();
        }
    }
}

//下面是增加的表格过滤的函数，通过在html里面的onkeydown来实现实时过滤

//对todo表格添加过滤函数
function appendOnkeydownForTodo() {
    var table = document.getElementById("todo");
    var todoInput = document.getElementById("toDoInput");
    setTimeout(function() {
        filterTheTable(todoInput.value, table);
    }, 200);
}

//对staff表格添加过滤函数
function appendOnkeydownForStaff() {
    var table = document.getElementById("staff");
    var todoInput = document.getElementById("staffInput");
    setTimeout(function() {
        filterTheTable(todoInput.value, table);
    }, 200);
}

//过滤函数
function filterTheTable(filterText, table) {
    var tbody = table.tBodies[0];
    var tbodyRows = tbody.rows;
    
    for (var i = 0; i < tbodyRows.length; i++) {
        if (tbodyRows[i].textContent.indexOf(filterText) == -1) {
            tbodyRows[i].style.display = "none";
        } else {
            tbodyRows[i].style.display = "";
        }
    }
}
