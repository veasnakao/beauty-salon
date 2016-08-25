AutoForm.hooks({
    addCustomer: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.Customer, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Customer add success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});