/**
  * JavaScript entry
  */
window.onload = function() {
  var tables = getAllTables();
  makeAllTablesFilterable(tables);
}

function getAllTables() {
  return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
  for (var i = 0; i < tables.length; i++) {
    var inputTextArea = document.createElement("input");
    inputTextArea.setAttribute("type", "text");
    tables[i].parentNode.insertBefore(inputTextArea, tables[i]);
    makeFilterable(tables[i], inputTextArea);
  }
}

function makeFilterable(table, ita) {
  ita.addEventListener("change", function() {
    // set marked rows as invisible, while others being visible
    // get the input text in the ita
    // loop check each row in the table, mark rows
    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].style.visibility = "visible";
      var highlightTexts = document.getElementsByClassName("highlight");
      for (var j = 0; j < highlightTexts.length; j++) {
        highlightTexts[j].className = ""
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
