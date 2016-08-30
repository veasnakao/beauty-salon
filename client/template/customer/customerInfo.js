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
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `staff name : ${customer.name}?`,
            onOk: () => {
                Meteor.call('removeCustomer', customer._id, (err, result) => {
                    if (err) {
                        sAlert.error(`Cancel ${customer.name}`);
                    } else {
                        sAlert.success(`Customer delete success ${customer.name}`);
                        Router.go('/showCustomer');
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});