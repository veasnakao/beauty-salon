
Template.addStaff.events({
    'click .js-addStaff': ()=> {
        if ($(".js-fee").val().length == 0) {
            $('.js-fee').val(0);
        }
        if ($(".js-baseSalary").val().length == 0) {
            $('.js-baseSalary').val(0);
        }
    }
});

AutoForm.hooks({
    addStaff: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.Staff, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Staff add success",
                type: "success",
                timer: 1000
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 3000
            })
        }
    }
});