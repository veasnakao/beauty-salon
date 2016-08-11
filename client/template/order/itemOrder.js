Tracker.autorun(function () {
    // if (Session.get('paramsOrderId')) {
    //     Meteor.subscribe("order", Session.get('paramsOrderId'));
    // }
});

//oncreated
Template.itemOrder.created = function () {
    let params = Router.current().params;
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('staffs');
        this.subscription = Meteor.subscribe("customer", Router.current().params.customerId);
        this.subscription = Meteor.subscribe("orderDetail", Router.current().params.orderId);
        this.subscription = Meteor.subscribe('order', Router.current().params.orderId);
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
    listCustomers: ()=> {
        let customers = Collection.Customer.find();
        if (customers) {
            return customers;
        }
    },
    showCustomer: ()=> {
        let params = Router.current().params;
        let customerId = params.customerId;
        if (customerId) {
            let customer = Collection.Customer.findOne(customerId);
            if (customer) {
                return customer.name;
            }
        }
    },
    showStaff: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        if (orderId) {
            let order = Collection.Order.findOne(orderId);
            if (order) {
                console.log(`staffId ${order.staffId}`);
                let staffId = order.staffId;
                let staff = Collection.Staff.findOne(staffId);
                return staff.name;
            }
        }
    },
    showOrderDetail: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        let orderDetail = Collection.OrderDetail.find({orderId: orderId});
        if (orderDetail) {
            return orderDetail;
        }
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
        let orders = Collection.Order.find(orderId);
        if (orders) {
            let totalPaid = 0;
            orders.forEach((objOrders)=> {
                totalPaid = objOrders.total;
            });
            return totalPaid;
        }
    }
});

//event
Template.itemOrder.events({
    //update customerId
    'click .js-customer'(){
        let params = Router.current().params;
        let customerId = $('.js-customer').val();
        console.log(`customerId ${customerId}`);
        let orderId = params.orderId;
        console.log(`orderId : ${orderId}`);
        Meteor.call('updateOrderCustomerId', orderId, customerId, (error)=> {
            if (error) {
                sAlert.error(error.message);
                IonLoading.hide();
            }
        });
    },
    'click .js-staff'(){
        let params = Router.current().params;
        let staffId = $('.js-staff').val();
        console.log(`staffId ${staffId}`);
        let orderId = params.orderId;
        console.log(`orderId : ${orderId}`);
        Meteor.call('updateOrderStaffId', orderId, staffId, (error)=> {
            if (error) {
                sAlert.error(error.message);
                IonLoading.hide();
            }
        });
    },
    //increase quantity
    'click .increase-quantity'(){
        let itemId = this.itemId;
        let orderDetail = Collection.OrderDetail.findOne({itemId: itemId});
        let params = Router.current().params;
        let customerId = params.customerId;
        let customer = Collection.Customer.findOne(customerId);
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: orderDetail.itemId,
            itemName: orderDetail.itemName,
            price: orderDetail.price,
            quantity: 1,
            discount: 0
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
        Meteor.call('updateOrderTotal', orderId, (err, result)=> {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });
    },

    //decrease-quantity
    'click .decrease-quantity'(){
        let itemId = this.itemId;
        let orderDetailQuantity;
        let orderDetail = Collection.OrderDetail.findOne({itemId: itemId});
        if (orderDetail) {
            let params = Router.current().params;
            let customerId = params.customerId;
            let customer = Collection.Customer.findOne(customerId);
            let selector = Session.get('orderDetailObj');
            selector[this._id] = {
                orderId: params.orderId,
                itemId: orderDetail.itemId,
                itemName: orderDetail.itemName,
                price: orderDetail.price,
                quantity: 1,
                discount: 0
            };
            orderDetailQuantity = orderDetail.quantity;
            console.log(`qty : ${orderDetailQuantity}`);
            if (orderDetailQuantity === 1) {
                IonPopup.alert({
                    title: 'Quantity order.',
                    template: 'Quantity can not be less than 1.'
                });
            } else {
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
                Meteor.call('updateOrderTotal', orderId, (err, result)=> {
                    if (err) {
                        sAlert.error(error.message);
                        IonLoading.hide();
                    } else {
                        IonLoading.hide();
                        Session.set('orderId', result);
                    }
                });
            }
        }
    },

    //delete-item-order
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
                Meteor.call('updateOrderTotal', orderId, (err, result)=> {
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
    },

    //confirm paid
    'click .js-paid'(){
        let params = Router.current().params;
        IonPopup.confirm({
            title: 'Paid.',
            template: 'Confirm paid.',
            onOk: () => {
                let orderId = params.orderId;
                Meteor.call('updateOrderStatus', orderId, (err, result)=> {
                    if (err) {
                        sAlert.error(error.message);
                        IonLoading.hide();
                    } else {
                        IonLoading.hide();
                        Session.set('orderId', undefined);
                        Router.go(`/showOrder`);
                    }
                });
            },
            onCancel: function () {
                sAlert.warning('Cancel paid.');
            }
        });
    }
});