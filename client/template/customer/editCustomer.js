//oncreate
Template.editCustomer.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customer', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editCustomer.rendered = function() {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

Template.editCustomer.helpers({
    customerInfo() {
        var template = Template.instance();
        return Collection.Customer.findOne({
            _id: template.data.id
        });
    }
});

Template.editCustomer.events({
    'click .js-editCustomer': ()=> {
        if ($(".js-fee").val().length == 0) {
            $('.js-fee').val(0);
        }
        if ($(".js-baseSalary").val().length == 0) {
            $('.js-baseSalary').val(0);
        }
    }
});
AutoForm.hooks({
    editCustomer: {
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Customer info update success",
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