Template.addStaff.rendered = function () {
};
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
            sAlert.success('Staff add success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});