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