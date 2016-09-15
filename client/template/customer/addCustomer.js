AutoForm.hooks({
    addCustomer: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.Customer, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Customer add success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});