# 测试方法

1、有类变量和类方法的继承
见控制台

2、filterable-table
makeAllTablesFilterable(getAllTables(), getAllFilters());

3、sortable 和 filterable
makeSortable(document.getElementById('todo'));
makeFilterable(document.getElementById('todo'));
makeSortable(makeFilterable(document.getElementById('todo')));
makeFilterable(makeSortable(document.getElementById('staff')));
