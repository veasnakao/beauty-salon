List={
    expenseItem: function() {
        var list = [];
        Collection.ExpenseItem.find({}, {
            sort: {
                name: 1
            }
        }).forEach(function(obj) {
            list.push({
                label: obj.name,
                value: obj.name
            });
        });
        return list;
    }  
};