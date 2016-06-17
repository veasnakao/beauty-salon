Template.addExpenseItem.rendered = function () {
};
Template.addExpenseItem.events({
});

AutoForm.hooks({
    addExpenseItem: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.ExpenseItem, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Expense Item Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});