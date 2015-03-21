window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);                         //two important functions!
    makeAllTablesFilterable(tables);
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");   //to caputrue all tables in web pages!
	return tables;
}
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {              //to set different rows with different color!
        for (var j = 0; j < (tables[i].childNodes[3].childNodes.length - 1)/2; j++) {
            if (j%2 == 1) tables[i].childNodes[3].childNodes[2*j + 1].style.backgroundColor = "LightGray";
        }
    }
    var thead = document.getElementsByTagName("th");
    for (var i = 0; i < thead.length; i++) {               //to bind thead elements with two event handlers: onmouseover and onmouseout!
    	thead[i].onmouseover = mouse_on;
    	thead[i].onmouseout=mouse_out;
    }
}
function makeAllTablesFilterable(tables) {                 //function to filter the tables!
    for (var i = 0; i < tables.length; i++) {
        var node = document.createElement('input');        //add a input to the first row pf a table!
        var btn = document.createElement('button');        //add a button.
        btn.innerHTML = " filter";
        tables[i].rows[0].appendChild(node);
        tables[i].rows[0].appendChild(btn);
        filter_table(tables[i]);                           //to invoke filter func!
    }
}

function filter_table(table) {
    table.rows[0].lastChild.onclick = function() {          //when arrow missed, event was invoked!
        var filter_str = this.previousSibling.value;                       //to get the content in input!\
        if (filter_str) {
            for (var i = 1; i < table.rows.length; i++) {
                var display_or_not = false;
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    if (table.rows[i].cells[j].innerHTML.indexOf(filter_str) != -1) {    //content contains the str or not!
                        table.rows[i].cells[j].innerHTML = table.rows[i].cells[j].innerHTML.replace(filter_str, filter_str.fontcolor("red"));
                        display_or_not = true;             //change its style to red font!
                    } else table.rows[i].cells[j].style.color = 'black';
                }
                if (!display_or_not) table.rows[i].style.display = "none";    //to hidden rows(not contain inputed str).
            }
        }
    }
}

function mouse_on() {                                      //mouseout: change background color!
    this.style.backgroundColor = "LightBlue";
    var p = this.parentNode.childNodes;
    var parentTable = this.parentNode.parentNode.parentNode;
    var i;
    for (i = 0; i < p.length; i++) {                       //to find which column was on!
        if (p[i] == this) break;
    }
    var column = (i + 1)/2;
    this.onclick = function() {                            //add click event to thead to trigger sort!
        if (this.childNodes.length == 1) {                 //if never click it, add the img!
            var pic = document.createElement("img");
            pic.setAttribute("src", "ascend.png");
            this.appendChild(pic);
            sort_table(parentTable, column, 0);            //sort in ascend way!
        } else {
            if (this.lastChild.getAttribute("src") == "ascend.png") {
                this.lastChild.setAttribute("src", "descend.png");
                sort_table(parentTable, column, 1);        //if click in second or third time....., change the image icon!
            } else {                                       //and sort the table in different ways!
                this.lastChild.setAttribute("src", "ascend.png");
                sort_table(parentTable, column, 0);
            }
        }
    }
}
function mouse_out() {                                     //mouseout: change background color!
    this.style.backgroundColor = "DarkBlue";               //also remove the child element img!
    var siblings = this.parentNode.childNodes;
    for (var i = 0; i < (siblings.length - 1)/2; i++) {    //remove the other thead column's img! 
        if (siblings[2*i + 1] != this && (siblings[2*i + 1].childNodes.length > 1)) siblings[2*i + 1].removeChild(siblings[2*i + 1].lastChild);
    }                                                      //after reviewing, i change here so as to fix the bug on user interface!
}
function sort_table(parentTable, column, mode) {           //parentTable is the table node! column is the Column to sort by;mode stands for ascend or descend! 
    var array = [];
    var rows = parentTable.childNodes[3].childNodes;
    var rows_num = (rows.length - 1)/2;                    //the num of row.
    var cells_num = (rows[1].childNodes.length - 1)/2;     //the num of column.
    for (var i = 0; i < rows_num; i++) {
        var array_b = [];
        for (var j = 0; j < cells_num; j++) {
            array_b.push(rows[2*i + 1].childNodes[2*j + 1].innerHTML.toString());
        }
        array.push(array_b);                               //push all datas into an array whose element is a tuple(array)!
    }
    if (mode == 0) array.sort(function(a, b) { return a[column - 1] > b[column - 1];});
    else array.sort(function(a, b) { return a[column - 1] < b[column - 1];});
    for (var i = 0; i < rows_num; i++) {                   //sort according to the referred column with two modes!
        for (var j = 0; j < cells_num; j++) {
            rows[2*i + 1].childNodes[2*j + 1].innerHTML = array[i][j];
        }                                                  //return data to each row!
    }                                                      //the end!
}