
//oncreated
Template.showOrder.created = function () {
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetails');
    }.bind(this));
};

//onrender
Template.showOrder.rendered = function () {
    Meteor.call('orderItemDetailByCustomer', function (error, result) {
        if (error) {
            sAlert.error(error.message);
        } else {
            console.log('render here');
            Session.set('orderByStaffResult', result);
        }
    });

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
    showCustomerOrder: function () {
        // return ReactiveMethod.call("orderItemDetailByCustomer",);
        //return ReactiveMethod.call('orderItemDetailByCustomer');
        let order = Session.get('orderByStaffResult');
        if (!_.isEmpty(order)) {
            if (order.content.length > 0) {
                return order;
            } else {
                return false;
            }
        }
    }
});

//event
Template.showOrder.onDestroyed(function(){
    Session.set('querySaleOrder', undefined);
    Session.set('orderByStaffResult', []);
})
Template.showOrder.events({
    'click .add-order': function () {
        Session.set('orderDetailObj', {});
        // let customerId = this._id;
        let selector = {};
        selector.date = new Date();
        // selector.customerId = customerId;
        selector.status = "active";

        Meteor.call('insertOrder', selector, (error, result) => {
            if (error) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
                // Router.go(`/itemOrder/customerId/${customerId}/orderId/${result}`);
                Router.go(`/itemOrder/orderId/${result}`);
            }
        })
    },
    'click .show-order-item': function () {
        let orderId = this._id;
        console.log(`orderId : ${orderId}`);
        let order = Collection.Order.findOne(orderId);
        console.log(`customer : ${order.customerId}`);
        console.log(`staff : ${order.staffId}`);
        Router.go(`/itemOrder/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`);
    }
});
