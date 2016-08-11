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
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        Meteor.call('removeSaleIfNoSaleDetailExist', orderId);
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
    'click .button': function () {
        console.log(`true`);
    },
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
        let customerId = this._id;
        let order = Collection.Order.find({customerId: customerId});
        if (order) {
            order.forEach((objOrder)=> {
                let orderId = objOrder._id;
                Router.go(`/itemOrder/customerId/${customerId}/orderId/${orderId}`);
            });
        }
    }
});

//helper
Template.showOrder.helpers({
    showCustomerOrder: function () {
        let data = {};
        let content = [];
        let orders = Collection.Order.find({'status': 'active'});
        if (orders) {
            orders.forEach((objOrder)=> {
                let customerId = objOrder.customerId;
                let customers = Collection.Customer.find({_id: customerId});
                customers.forEach((objCustomers)=> {
                    let customerId = objCustomers._id;
                    let customerName = objCustomers.name;
                    objCustomers.customerId = customerId;
                    objCustomers.customerName = customerName;
                    content.push(objCustomers);
                });
            });
            data.content = content;
            return data;
        }

        // Meteor.call('findOrder', true, (err, result) => {
        //     if (err) {
        //         sAlert.error(error.message);
        //         IonLoading.hide();
        //     } else {
        //         // console.log(result.content.customerId);
        //         // IonLoading.hide();
        //         // Session.set('orderId', result);
        //     }
        // });
        // let data = {};
        // let content = [];
        // let orders = Collection.Order.find({"status": "true"});
        // orders.forEach((objOrders)=> {
        //     let customerName = "";
        //     let customerId = objOrders.customerId;
        //     let customers = Collection.Customer.find({_id:customerId});
        //     customers.forEach((objCustomers)=>{
        //         customerName = objCustomers.name;
        //         objCustomers.id = customerId;
        //         objCustomers._customerName = customerName;
        //         content.push(objCustomers)
        //     });
        // });
        // data.content = content;
        // return data;
    }
});
