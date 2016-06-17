Template.addItem.rendered = function () {
};
Template.addItem.events({
});

AutoForm.hooks({
    addItem: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.Item, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Item Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});