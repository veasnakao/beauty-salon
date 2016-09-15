Template.addItem.rendered = function () {
};
Template.addItem.events({});

AutoForm.hooks({
    addItem: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.genWithPrefix(Collection.Item, '001-', 7);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Service item add success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});