//oncreated
Template.showOrder.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
    }.bind(this));
};

//onrender
Template.showOrder.rendered = function () {
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
Template.showOrder.helpers({
    showOrder: ()=> {
        return Collection.Order.find({}, {sort: {_id: 1}});
    },
    showCustomer: ()=> {
        return Collection.Customer.find({}, {sort: {_id: 1}});
    }
});
