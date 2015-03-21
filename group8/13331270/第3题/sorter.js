/******************************************
In file sorter.js
First edited by Jiarong wu on 11/4/2014
Last edited by Jiarong wu on 3/22/2015
Tel:18819473271 Email:973430584@qq.com
*******************************************/

window.onload = function() {
  var tables = document.getElementsByTagName("table");
  addSpanTagToEachLetter(tables);

  for (var i = 0; i < tables.length; i++) {
    makeFilterable(makeSortable(tables[i]));
  }
}

//对表格的所有字符添加span
function addSpanTagToEachLetter(tables) {
  for (var i = 0; i < tables.length; i++) {
    for (var j = 0; j < tables[i].tBodies[0].rows.length; j++) {
      for (var k = 0; k < tables[i].tBodies[0].rows[j].cells.length; k++) {
        var innerHTML = "";
        for (var h = 0; h < tables[i].tBodies[0].rows[j].cells[k].textContent.length; h++) {
          innerHTML += '<span>' + tables[i].tBodies[0].rows[j].cells[k].textContent[h] + '</span>';
        }
        tables[i].tBodies[0].rows[j].cells[k].innerHTML = innerHTML;
      }
    }
  }
}

// 排序函数，返回排好序的table
function makeSortable(table) {
  var ths = table.tHead.rows[0].cells;
  
  for (var j = 0; j < ths.length; j++) {
    ths[j].onclick = function(j) {
      return function() {
        sortTables(table, j);
      };
    }(j);
  }
  return table;
}

// 筛选函数，返回注册筛选事件的table
function makeFilterable(table) {
  if (table.getAttribute('id') == 'todo') {
    document.querySelectorAll('input')[0].onkeyup = function() {
      var todoInput = document.getElementById("toDoInput");
      filterTheTable(todoInput.value, table);
    }
  } else {
    document.querySelectorAll('input')[1].onkeyup = function() {
      var todoInput = document.getElementById("staffInput");
      filterTheTable(todoInput.value, table);
    }
  }
  return table;
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

//过滤函数
function filterTheTable(filterText, table) {
  //将span的className去除
  for (var i = 0; i < table.querySelectorAll('span').length; i++) {
    table.querySelectorAll('span')[i].className = ""
  }

  var tbody = table.tBodies[0];
  var tbodyRows = tbody.rows;
  
  for (var i = 0;i < tbodyRows.length; i++) {
    if (tbodyRows[i].textContent.toLowerCase().indexOf(filterText.toLowerCase()) == -1) {
      tbodyRows[i].style.display = "none";
    } else {
      for (var j = 0; filterText && filterText != "" && j < tbodyRows[i].cells.length; j++) {
        var index = 0;
        while (tbodyRows[i].cells[j].textContent.toLowerCase().indexOf(filterText.toLowerCase(), index) != -1) {
          var length = filterText.length;
          var index = tbodyRows[i].cells[j].textContent.toLowerCase().indexOf(filterText.toLowerCase(), index)

          //对符合条件的span高亮显示
          for (var k = index; k < index + length; k++) {
            tbodyRows[i].cells[j].querySelectorAll('span')[k].className = 'textHighLight';
          }
          index = index + length;
        }
      }
      tbodyRows[i].style.display = "";
    }
  }
}
