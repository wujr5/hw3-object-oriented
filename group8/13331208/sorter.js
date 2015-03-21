var Base = function(iv) {
	this.instanceVariable = iv;
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	}
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}


var Derived = function(iv) {
	this.instanceVariable = iv;
	this.instanceMethod = function() {
		new Base(iv).instanceMethod.apply(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	Base.staticMethod.apply(Derived);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

function extend(base, derived) {
	var F = function(){};
	F.prototype = base.prototype;
	derived.prototype = new F();
	derived.prototype.constructor = derived;
	derived.uber = base.prototype;
}

extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

window.onload = function() {
	var tables = getAllTables();
	var filters = getAllFilters();
	//makeALLTablesSortable(tables);
	//makeAllTablesFilterable(tables, filters);

}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function tableSorter(table) {
	this.table = table;
	this.mode = "descend";
	this.getTitles = function() {
		return this.table.rows[0].cells;
	}
 	this.setClickedEvent = function() {
 		var titles = this.getTitles();
 		var curSorter = this;
		for (var i = 0; i < titles.length; i++) {
			titles[i].addEventListener("click", function() {
				if (this.className == "") {
					curSorter.mode = "descend";
				}
				this.className = curSorter.getClickedPatern();
				var curIndex = curSorter.getIndexByTitle(this.innerHTML);
				if (curIndex != -1) {
					curSorter.sortByCol(curIndex);
				}
			});
		}
	}
	this.getClickedPatern = function() {
		this.clearALLPattern();
		if (this.mode == "descend") {
			this.mode = "ascend";
		} else {
			this.mode = "descend";
		}
		return this.mode;
	}
	this.clearALLPattern = function() {
		var titles = document.getElementsByTagName("th");
		for (var i = 0; i < titles.length; i++) {
			titles[i].className = "";
		}
	}
	this.getIndexByTitle = function(indexByTitle) {
		var titles = this.getTitles();
		var index = -1;
		for (var i = 0; i < titles.length; i++) {
			if (indexByTitle == titles[i].innerHTML) {
				index = i;
				return index;
			}
		}
	}
	this.sortByCol = function(index, cur) {
		var rowsArray = [];
		var k = 0;
		if (this.table.tBodies[0].rows[0].innerHTML == this.table.rows[0].innerHTML)
			k = 1;
		for (var i = k; i < this.table.tBodies[0].rows.length; i++) {
			rowsArray.push(this.table.tBodies[0].rows[i]);
		}
		var curMode = this.mode;
		rowsArray.sort(function(tr1, tr2) {
	        var a = tr1.cells[index].textContent.replace(/\W/g, "");
	        var b = tr2.cells[index].textContent.replace(/\W/g, "");
	        return (curMode == "ascend" ? a>b : a<b);
	    });
	    for (var i = 0; i < rowsArray.length; i++) {
	        this.table.tBodies[0].appendChild(rowsArray[i]);
	    }
	}
}

function makeALLTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		sortable = new tableSorter(tables[i]);
		sortable.setClickedEvent();
	}
}                           

function getAllFilters() {
	var inputs = document.getElementsByTagName("input");
	var filters = [];
	for (var i = 0; i < inputs.length; i++)
		if (inputs[i].getAttribute("name").indexOf("filter") != -1)
			filters.push(inputs[i]);
	return filters;
}

function tableFilter(table, filter) {
	this.table = table;
	this.filter = filter;
	this.setKeyUpEvent = function() {
		var curFilter = this;
		this.filter.addEventListener("keyup", function() {
			var keys = curFilter.getKeyWords();
			var rowsArray = curFilter.table.rows;
			var found = [];
			curFilter.clearALLPattern();
			for (var i = 1; i < rowsArray.length; i++) {
				var str = rowsArray[i].textContent.toLowerCase().replace(/\W/g, "");
				var foundrow = true;
				for (var j = 0; j < keys.length; j++) {
					if (str.indexOf(keys[j]) != -1) {
						rowsArray[i].style.display = "table-row";
					} else {
						rowsArray[i].style.display = "none";
						foundrow = false;
						break;
					}
				}
				if (foundrow) {
					found.push(rowsArray[i]);
				}
			}
			curFilter.addPattern(keys, found);
		});
	}
	this.getKeyWords = function() {
		return this.filter.value.split(" ");
	}
	this.clearALLPattern = function() {
		var trs = this.table.rows;
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].innerHTML.indexOf('<span class="highlight">') != -1) {
				trs[i].innerHTML = trs[i].innerHTML.replace(/<span class="highlight">/g, "");
				trs[i].innerHTML = trs[i].innerHTML.replace(/<\/span>/g, "");
			}
		}
	}
	this.addPattern = function(keys, found) {
		for (var i = 0; i < found.length; i++) {
			var foundCells = found[i].cells;
			for (var k = 0; k < foundCells.length; k++) {
				for (var j = 0; j < keys.length; j++) {
					if (keys[j] == "")
						continue;
					addHighlight(foundCells[k],keys[j]); 
				}
			}
		}
	}
}

function addHighlight(target, key) {
	if (key == "")
		return;
	var tmp = target.innerHTML;
	var htmlReg = new RegExp("\<.*?\>", "i");
	var htmlArray = [];
	for (var i = 0; true; i++) {
		var matched = htmlReg.exec(tmp);
		if (matched) {
			htmlArray[i] = matched;
		} else {
			break;
		}
		tmp = tmp.replace(matched, "{[()]}");
	}
    var keyReg = new RegExp("("+key+")", "ig");
    tmp = tmp.replace(keyReg,"<span class='highlight'>$1</span>");
    for (var i = 0; i < htmlArray.length; i++) {
        tmp = tmp.replace("{[()]}",htmlArray[i]);
    }
    target.innerHTML = tmp;
}

function makeAllTablesFilterable(tables, filters) {
	for (var i = 0; i < tables.length; i++) {
		filterable = new tableFilter(tables[i], filters[i]);
		filterable.setKeyUpEvent();
	}
}

function makeSortable(table_dom) {
	selected = new tableSorter(table_dom);
	selected.setClickedEvent();
	return table_dom;
}

function makeFilterable(table_dom) {
	var filters = getAllFilters();
	var found;
	for (var i = 0; i < filters.length; i++) {
		if (filters[i].getAttribute("id").indexOf(table_dom.getAttribute("id")) != -1) {
			found = filters[i];
			break;
		}
	}
	selected = new tableFilter(table_dom, found);
	selected.setKeyUpEvent();
	return table_dom;
}