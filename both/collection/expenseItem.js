Collection.ExpenseItem = new Mongo.Collection("expenseItem");
Schema.ExpenseItem = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    }
});
Collection.ExpenseItem.attachSchema(Schema.ExpenseItem);