//oncreate
Template.showCustomer.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customers');
    }.bind(this));
};

//onrender
Template.showCustomer.rendered = function () {
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
Template.showCustomer.helpers({
    showCustomer: ()=> {
        let customer = Collection.Customer.find({}, {sort: {_id: 1}});
        if (customer) {
            return customer;
        }
    }
});