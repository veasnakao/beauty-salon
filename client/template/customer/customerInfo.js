//oncreate
Template.customerInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customer', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.customerInfo.rendered = function() {
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

//helper
Template.customerInfo.helpers({
    customerInfo: function () {
        return Collection.Customer.findOne({_id: Router.current().params._id});
    }
});

//events
Template.customerInfo.events({
    'click .delete-customer'(){
        let params = Router.current().params;
        let customerId = params._id;
        let customer = Collection.Customer.findOne({_id: customerId});
        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5591DF",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false, closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                Meteor.call('removeCustomer', customer._id, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        Router.go('/showCustomer');
                        swal("Deleted!", "Your customer has been deleted.", "success");
                    }
                });
            } else {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: true
                })
            }
        });
    }
});