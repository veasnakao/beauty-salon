Collection.DayExpense = new Mongo.Collection("dayExpense");
Schema.DayExpense = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    expenseItem: {
        type: [Object],
        optional: true,
        custom() {
            if (this.field('stockType').value == 'NonStock' && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
                return "required";
            }
        }
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
Collection.DayExpense.attachSchema(Schema.DayExpense);