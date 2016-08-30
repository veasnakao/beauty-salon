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
            overhang.notify({
                type : "success",
                message: "Item is added success"
            });
        },
        onError(formType, error){
            // overhang.notify({
            //     type : "error",
            //     message: 'error'
            // });
            sAlert.error(error.message);
        }
    }
});