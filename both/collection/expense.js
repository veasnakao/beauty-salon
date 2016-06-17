Collection.Expense = new Mongo.Collection("expense");
Schema.Expense = new SimpleSchema({
    expenseItem: {
        type: [Object],
        optional: true
    },
    'expenseItem.$.expenseItemName': {
        type: String,
        autoform: {
            type: 'select',
            options: function () {
                return List.expenseItem();
            }
        }
    },
    'expenseItem.$.price': {
        type: Number,
        label: "Price ($)",
        decimal: true
    }
});
Collection.Expense.attachSchema(Schema.Expense);