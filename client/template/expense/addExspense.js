

AutoForm.hooks({
    addExpense: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.Expense, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Expense Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});