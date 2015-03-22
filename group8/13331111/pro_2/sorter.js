window.onload = function() {
	var tables = getAllTables();
    makeAllTablesFilterable(tables);    //the primary fucntion!
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");   //to caputrue all tables in web pages!
	return tables;
}
function makeAllTablesFilterable(tables) {                 //function to filter the tables!
    for (var i = 0; i < tables.length; i++) {              //to set different rows with different color!
        for (var j = 0; j < (tables[i].childNodes[3].childNodes.length - 1)/2; j++) {
            if (j%2 == 1) tables[i].childNodes[3].childNodes[2*j + 1].style.backgroundColor = "LightGray";
        }
    }
    for (var i = 0; i < tables.length; i++) {
        var node = document.createElement('input');        //add a input to the first row pf a table!
        tables[i].rows[0].appendChild(node);
        filter_table(tables[i]);                           //to invoke filter func!
    }
}

function init(array, table) {                              //to store the table's date in array!
    for (var i = 1; i < table.rows.length; i++) {
        var array_b = [];
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            array_b[j] = table.rows[i].cells[j].innerHTML.toString();
        }
        array.push(array_b);
    }
}
function reset(array, table) {                              //reset the content of formal table!
    for (var i = 1; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].innerHTML = array[i - 1][j];
        }
        table.rows[i].style.display = "table-row";
    }
}
function filter_table(table) {
    var array = [];
    init(array, table);
    table.rows[0].lastChild.oninput = function() {          //when arrow missed, event was invoked!
        reset(array, table);
        var filter_str = this.value;                       //to get the content in input!
        if (filter_str) {
            for (var i = 1; i < table.rows.length; i++) {
                var display_or_not = false;
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    if (table.rows[i].cells[j].innerHTML.indexOf(filter_str) != -1) {    //content contains the str or not!
                        table.rows[i].cells[j].innerHTML = table.rows[i].cells[j].innerHTML.toString().replace(filter_str, "<mark>" + filter_str + "</mark>");
                        display_or_not = true;             //change its style to red font!
                    }
                }
                if (!display_or_not) table.rows[i].style.display = "none"; //to hidden rows(not contain inputed str).
                else table.rows[i].style.display = "table-row";
            }
        }
    }
}
    