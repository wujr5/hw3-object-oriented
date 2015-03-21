// Get table from HTML
function getAllTables() {
	return document.getElementsByTagName("table");
}


function makeAllTablesSortable(tables) {
    label = new Array;
	for(var i = 0; i < tables.length; i++) {
		this_table = tables[i];
        this_table.Text_value = null;
        label[i] = this_table.getElementsByTagName("th");
        indexColor = this_table.getElementsByTagName("tr");
		for(var j = 0; j < label[i].length; j++) {
            // Control the color of each row
            if(j % 2 == 0) {
                indexColor[j].style.backgroundColor = "rgb(221, 221, 221)";
            }

            // Check whether the th had been click
            label[i][j].isclick = false;

            // Judge the order: ascend or descend
			label[i][j].sorted = true;

            label[i][j].table_id = i;
            label[i][j].col = j;
            label[i][j].onclick = sort;

            // The mouse is on the th
            label[i][j].onmouseover = function() {
                this.style.backgroundColor = "rgb(164, 176, 252)";
            }

            // The mouse is out of the th
            label[i][j].onmouseout = function() {     
                if(!label[this.table_id][this.col].isclick) {
                    this.style.backgroundColor = "rgb(0, 0, 128)";
                }
            }
		}
	}
}


// sort algorithm
function sort() {
    // The th had been click
    for(var i = 0; i < label[this.table_id].length; i++) {
        label[this.table_id][i].isclick = false;
    }
    label[this.table_id][this.col].isclick = true;


	tables = getAllTables();
    //alert(tables[this.table_id].Text_value);
    var imgArr = ["ascend.png", "descend.png"];
    table_body = tables[this.table_id].getElementsByTagName("tbody");
    value_of_this_row = table_body[0].getElementsByTagName("tr");
    label[this.table_id][this.col].sorted = !label[this.table_id][this.col].sorted;
    
    // control the picture
    for(var i = 0; i < label[this.table_id].length; i++) {
        tables[this.table_id].getElementsByTagName("th")[i].style.backgroundColor = "rgb(0, 0, 128)";
    }
    tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundColor = "rgb(164, 176, 252)";
    
    if(!label[this.table_id][this.col].sorted) {
        tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundImage = "url(" + imgArr[0] + ")";
    } else {
        tables[this.table_id].getElementsByTagName("th")[this.col].style.backgroundImage = "url(" + imgArr[1] + ")";
    }

    //bubble sort
    bubble_sort(this.table_id, this.col, value_of_this_row);
    ////////////
    var sorttable = getAllTables();
    
    if(sorttable[this.table_id].Text_value == null) {
        return;
    }
    
    var pattern_ = new RegExp(sorttable[this.table_id].Text_value, "g");
    var table_TH = sorttable[this.table_id].getElementsByTagName("th");
    for(var i = 0; i < table_TH.length; i++) {
        var TD_is_match = false;
        var table_TD = sorttable[this.table_id].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
        for(var j = 0; j < table_TD.length; j++) {
            if(table_TD[j].innerHTML.match(pattern_) != null) {
                TD_is_match = true;
            }
        }
        if(TD_is_match) {
            tables[this.table_id].rows[i + 1].style.display = "table-row";
        } else {
            tables[this.table_id].rows[i + 1].style.display = "none";
        }
    }
    
    
}

function bubble_sort(Table_Id, Col, Value) {
	list = new Array;
    for(var i = 0; i < Value.length; i++) {
        list[i] = Value[i].getElementsByTagName("td")[Col];
    }
    for(var i = 0; i < list.length; i++) {
    	for(var j = i + 1; j < list.length; j++) {
    		if(!label[Table_Id][Col].sorted) {
    		    if(list[i].innerHTML > list[j].innerHTML) {
                    var middle = list[i];
                    list[i] = list[j];
                    list[j] = middle;
                    middle = Value[i].innerHTML;
                    Value[i].innerHTML = Value[j].innerHTML;
                    Value[j].innerHTML = middle;
                }
    		} else {
    			if(list[i].innerHTML < list[j].innerHTML) {
                    var middle = list[i];
                    list[i] = list[j];
                    list[j] = middle;
                    middle = Value[i].innerHTML;
                    Value[i].innerHTML = Value[j].innerHTML;
                    Value[j].innerHTML = middle;
                }
    		}
    	}
    }
}

function makeAllTablesFilterable(tables) {
    for(var i = 0; i < tables.length; i++) {
        this_table = tables[i];
        this_table.Text_value = null;
        this_table.table_id = i;
        setText(this_table);
    }
}

table_ID = 0;

function setText(table) {
    // create a text
    var text = document.createElement("input");
    text.type = "text";
    document.body.insertBefore(text, table);
    
    recover_value = new Array; // recover the table
    var table_th = table.getElementsByTagName("th"); 
    for(var i = 0; i < table_th.length; i++) {
        recover_value[i] = new Array;
    }
    
    var is_visited = false;
    
    // listen to the text
    text.oninput = function() {
        if(table_ID != table.table_id) {
            is_visited = false;
        }
        table.Text_value = this.value;
        //alert(table.Text_value);
        text_value = this.value;
        // recover the table
        if(is_visited) {
            var table_th = table.getElementsByTagName("th"); 
            for(var i = 0; i < table_th.length; i++) {
                var table_number = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                for(var j = 0; j < table_number.length; j++) {
                    table_number[j].innerHTML = recover_value[i][j];
                }
            }
        } else {
            table_ID = table.table_id;
        }

        // recover the table while text is empty
        if(text_value == "") {
            var length = table.rows.length;
            for(var i = 0; i < length; i++) {
                table.rows[i].style.display = "table-row";
            }
            return;
        }

        // match text
        pattern = new RegExp(text_value, "g");
        var row = table.getElementsByTagName("th");
        table_value = new Array;

        
        for(var i = 0; i < row.length; i++) {
            var is_match = false;
            table_value[i] = new Array;
            table_value[i] = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
            for(var j = 0; j < table_value[i].length; j++) {
                recover_value[i][j] = table_value[i][j].innerHTML;
                if(table_value[i][j].innerHTML.match(pattern) != null) {
                    table_value[i][j].innerHTML = table_value[i][j].innerHTML.replace(pattern, change(text_value));
                    is_match = true;
                }
            }

            var corrent_row = i + 1;

            // display the table
            if(is_match) {
                table.rows[corrent_row].style.display = "table-row";
            } else {
                table.rows[corrent_row].style.display = "none";
            }
        }
        is_visited = true;
    }
}

function change(character) {
    return "<span class=\"BIG\">" + character + "</span>";
}

function makeSortable(table) {
    makeAllTablesSortable(table);
    return table;
}

function makeFilterable(table) {
    makeAllTablesFilterable(table);
    return table;
}

window.onload = function(){
	var tables = getAllTables();
	//makeAllTablesSortable(tables);
    //makeAllTablesFilterable(tables);
    //makeSortable(tables);
    //makeFilterable(tables);
    makeSortable(makeFilterable(tables));
    //makeFilterable(makeSortable(talbes));
}