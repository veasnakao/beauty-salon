AutoForm.hooks({
    addDayExpense: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.DayExpense, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Day Expense Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});