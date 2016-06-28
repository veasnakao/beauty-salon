//oncreated
Template.showOrder.created = function () {
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
    }.bind(this));
};

//onrender
Template.showOrder.rendered = function () {
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        // Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
        Session.set('orderId', undefined);
    }
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

//event
Template.showOrder.events({
    'click .add-order':()=>{
        
    } 
});

//helper
Template.showOrder.helpers({
    showOrder: ()=> {
        return Collection.Order.find({}, {sort: {_id: 1}});
    }
    // showCustomer: ()=> {
    //     return Collection.Customer.find({}, {sort: {_id: 1}});
    // }
});
