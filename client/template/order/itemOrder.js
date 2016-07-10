Tracker.autorun(function () {
    if (Session.get('paramsOrderId')) {
        Meteor.subscribe("order", Session.get('paramsOrderId'));
    }
});
//oncreated
Template.itemOrder.created = function () {
    let params = Router.current().params;
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orders');
        this.subscribe = Meteor.subscribe("customer", Router.current().params.customerId);
        this.subscribe = Meteor.subscribe("orderDetail", Router.current().params.orderId);
    }.bind(this));
};

//onrender
Template.itemOrder.rendered = function () {
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
Template.itemOrder.helpers({
    showStaff: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        // let staffId = order.staffId;
        return order;
    },
    showOrderDetail: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        return Collection.OrderDetail.find({orderId: orderId});
    },
    // totalByItem: ()=> {
    //     let params = Router.current().params;
    //     let orderId = params.orderId;
    //     console.log(`orderId : ${orderId}`);
    //     let orderDetail = Collection.OrderDetail.find({orderId: orderId});
    //     let totalByItem = 0;
    //     orderDetail.forEach((obj)=> {
    //         totalByItem = obj.price * obj.quantity;
    //         console.log(totalByItem);
    //     });
    //     // console.log(totalByItem);
    // },
    totalOrder: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        console.log(`orderId : ${orderId}`);
        let orders = Collection.Order.find(orderId);
        let totalPaid = 0;
        orders.forEach((objOrders)=> {
            totalPaid = objOrders.total;
        });
        return totalPaid;
    }
});

//event
Template.itemOrder.events({
    'click .increase-quantity'(){
        let itemId = this.itemId;
        let orderDetail = Collection.OrderDetail.findOne({itemId: itemId});
        let params = Router.current().params;
        let customerId = params.customerId;
        let customer = Collection.Customer.findOne(customerId);
        let customerName = customer.name;
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: orderDetail.itemId,
            itemName: orderDetail.itemName,
            price: orderDetail.price,
            quantity: 1,
            quantityOut: 0,
            discount: 0,
            customerId: params.customerId,
            customerName: customerName
        };
        Meteor.call('insertOrderDetail', selector, (err, result) => {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });

        let orderId = params.orderId;
        Meteor.call('updateOrderDetail', orderId, (err, result)=> {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });
    },
    'click .decrease-quantity'(){
        let itemId = this.itemId;
        let orderDetail = Collection.OrderDetail.findOne({itemId: itemId});
        let params = Router.current().params;
        let customerId = params.customerId;
        let customer = Collection.Customer.findOne(customerId);
        let customerName = customer.name;
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: orderDetail.itemId,
            itemName: orderDetail.itemName,
            price: orderDetail.price,
            quantity: 1,
            quantityOut: 0,
            discount: 0,
            customerId: params.customerId,
            customerName: customerName
        };
        Meteor.call('decreaseOrderQuantity', selector, (err, result) => {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });

        let orderId = params.orderId;
        Meteor.call('updateOrderDetail', orderId, (err, result)=> {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });
    },
    'click .delete-item-order'(){
        let params = Router.current().params;
        let itemId = this.itemId;
        let orderDetail = Collection.OrderDetail.findOne({itemId: itemId});
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `Item name : ${orderDetail.itemName}?`,
            onOk: () => {
                Meteor.call('removeOrderDetail', orderDetail._id, (err, result) => {
                    if (err) {
                        sAlert.error(`Cancel ${orderDetail.itemName}`);
                    } else {
                        sAlert.success(`Item delete success ${orderDetail.itemName}`);
                    }
                });

                //update order when delete orderDetail
                let orderId = params.orderId;
                Meteor.call('updateOrderDetail', orderId, (err, result)=> {
                    if (err) {
                        sAlert.error(error.message);
                        IonLoading.hide();
                    } else {
                        IonLoading.hide();
                        Session.set('orderId', result);
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});