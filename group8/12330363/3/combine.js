function makeSortable(table) {
  var tHeads = table.tHead.getElementsByTagName("th");
  setTableHeadStyle(tHeads);
  for (var j = 0; j < tHeads.length; j++) {
    makeTableHeadClickable(tHeads[j], table, j);
  }
  return table;
}

function setTableHeadStyle(ths) {
  for (var i = 0; i < ths.length; i++) {
    // add a span to contain the arrow icon
    var indicator = document.createElement("span");
    indicator.className = "indicator";
    var indicatorImg = document.createElement("img");
    indicatorImg.src = "./ascend.png";
    indicatorImg.alt = "^";
    indicator.appendChild(indicatorImg);
    ths[i].appendChild(indicator);
  }
}

function makeTableHeadClickable(th, table, col) {
  /* When mouse click the head row */
  // initially, the sorting order should be ascending
  var isAscending = true;

  /**
    * 1) Style changes:
    *    BG color changes;
    *    Arrow icon shows.
    */
  th.addEventListener("click", function() {
    // clear other head rows' style
    if (document.getElementById("active")) {
      var active = document.getElementById("active");
      active.id = "";
    }
    // set the current active th's style
    th.id = "active";
    var indicator = th.getElementsByTagName("span")[0];
    indicator.id = "active-indicator";
    var indicatorImg = indicator.getElementsByTagName("img")[0];
    indicatorImg.src = isAscending ? "./ascend.png" : "./descend.png";
    indicatorImg.alt = isAscending ? "^" : "v";
    isAscending = !isAscending;
  });

  /**
    * 2) rows are sorted by the selected column
    */
  th.addEventListener("click", function() {
    sortTable(table, col, isAscending);
  });
}

function sortTable(table, col, isAscending) {
  var arr = [];
  var tBodies = table.rows;
  for (var i = 1; i < tBodies.length; i++) {
    if (tBodies[i].style.visibility != "collapse") {
      arr.push(tBodies[i]);
    }
  }
  // BUG exisited for soj.sysu.edu.cn
  arr.sort(function(a, b) {
    if (isAscending) {
      return (a.cells[col].innerHTML.trim() < b.cells[col].innerHTML.trim());
    } else {
      return (a.cells[col].innerHTML.trim() > b.cells[col].innerHTML.trim());
    }
    return true;
  });
  // change table contents accordingly
  var newRows = [];
  for (var i = 0; i < arr.length; i++) {
    newRows.push("" + arr[i].innerHTML);
  }
  for (var i = 1; i < tBodies.length; i++) {
    tBodies[i].innerHTML = newRows[i - 1];
  }
}


function makeFilterable(table) {
  var inputTextArea = document.createElement("input");
  inputTextArea.setAttribute("type", "text");
  table.parentNode.insertBefore(inputTextArea, table);
  makeTableFilterable(table, inputTextArea);
  return table;
}

function makeTableFilterable(table, ita) {
  ita.addEventListener("change", function() {
    // set marked rows as invisible, while others being visible
    // get the input text in the ita
    // loop check each row in the table, mark rows
    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].style.visibility = "visible";
      var highlightTexts = document.getElementsByClassName("highlight");
      for (var j = 0; j < highlightTexts.length; j++) {
        highlightTexts[j].className = "";
      }
    }
    for (var i = 1; i < table.rows.length; i++) {
      var flag = false;
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        // check each cell
        var cell = table.rows[i].cells[j];
        pos = cell.innerHTML.indexOf(ita.value);
        if (pos != -1) {
          flag = true;
          // highlight keyword
          cell.innerHTML = cell.innerHTML.substring(0, pos) +
            '<span class="highlight">' +
            cell.innerHTML.substring(pos, pos + ita.value.length) +
            '</span>' +
            cell.innerHTML.substring(pos + ita.value.length, cell.innerHTML.length);
        }
      }
      if (!flag) {
        table.rows[i].style.visibility = "collapse";
      }
    }
  });
}
