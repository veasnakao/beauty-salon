Tracker.autorun(function () {
    if (Session.get('OrderId')) {
        Meteor.subscribe("journalEntrys");
    }
});

//oncreated
Template.itemOrder.created = function () {
    let params = Router.current().params;
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('staffs');
        this.subscription = Meteor.subscribe("customers");
        this.subscription = Meteor.subscribe("orderDetail", Router.current().params.orderId);
        this.subscription = Meteor.subscribe('order', Router.current().params.orderId);
        this.subscription = Meteor.subscribe('payment', Router.current().params.orderId);
        // this.subscription = Meteor.subscribe('journalEntrys');
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
        });
        let params = Router.current().params;
        let staffId = params.query.staffId;
        $('.js-staff').val(staffId);
        let checkStaffId = $('.js-staff').val();
        if (checkStaffId == null || checkStaffId == "") {
            $('.search-item').hide();
        } else {
            $('.search-item').show();
        }
    } catch (e) {
        console.log(e);
    }
};


//helper
Template.itemOrder.helpers({
    checkStatus(){
        if (Session.get('orderStatus') == 'active') {
            let check = Session.get('orderStatus');
            return true
        } else {
            let orderId = Router.current().params.orderId;
            let order = Collection.Order.findOne(orderId);
            let status = order.status;
            if (status == 'active') {
                return true;
            } else {
                return false;
            }
        }
    },
    order() {
        let params = Router.current().params;
        let orderId = params.orderId;
        console.log(`itemOrder : ${orderId}`);
        let order = Collection.Order.findOne(orderId);
        if (orderId) {
            let selector = {
                customerId: order.customerId,
                staffId: order.staffId,
                date: order.date
            };
            return selector;
        }
    },
    // listCustomers(){
    //     let customers = Collection.Customer.find();
    //     if (customers) {
    //         return customers;
    //     }
    // },
    // showCustomer(){
    //     let customer = Collection.Customer.find();
    //     if (customer) {
    //         return customer;
    //     }
    // },
    // showStaff(){
    //     let staff = Collection.Staff.find();
    //     if (staff) {
    //         return staff;
    //     }
    // },
    showOrderDetail(){
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
    totalOrder(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        if (order) {
            let totalPaid = order.total;
            return totalPaid;
        }
    },
    payment(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let payment = Collection.Payment.findOne({orderId: orderId}, {sort: {_id: -1}});
        if (payment) {
            console.log(payment);
            return payment;
        }
    }
});

//event
Template.itemOrder.events({
    'change .js-orderDate'(){
        let orderDate = $('.js-orderDate').val();
        let staffId = $('.js-staff').val();
        let params = Router.current().params;
        let orderId = params.orderId;
        if (orderDate.length === 0 || staffId.length === 0) {
            $('.search-item').hide(300);
        } else {
            $('.search-item').show(300);
        }
        let updateObj = {};

        if (orderDate && orderId) {
            updateObj.date = orderDate;
            Meteor.call('updateOrder', orderId, updateObj, (error)=> {
                if (error) {
                    sAlert.error(error.message);
                    IonLoading.hide();
                }
            });
        }
    },
    'change .js-customer'(){
        let params = Router.current().params;
        let customerId = $('.js-customer').val();
        let orderId = params.orderId;
        let updateObj = {};

        if (customerId && orderId) {
            updateObj.customerId = customerId;
            Meteor.call('updateOrder', orderId, updateObj, (error)=> {
                if (error) {
                    sAlert.error(error.message);
                    IonLoading.hide();
                }
            });
        }
    },
    'change .js-staff'(){
        let params = Router.current().params;
        let staffId = $('.js-staff').val();
        let orderDate = $('.js-orderDate').val();
        let orderId = params.orderId;
        if (staffId.length === 0 || orderDate.length === 0) {
            $('.search-item').hide(300);
        } else {
            $('.search-item').show(300);
        }
        let updateObj = {};

        if (staffId && orderId) {
            updateObj.staffId = staffId;
            Meteor.call('updateOrder', orderId, updateObj, (error)=> {
                if (error) {
                    sAlert.error(error.message);
                    IonLoading.hide();
                }
            });
        }
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
                        sAlert.success(`Item delete success ${orderDetail.itemName}`);
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
                debugger;
                let orderId = params.orderId;
                let selector = {};
                selector.date = new Date();
                selector.orderId = orderId;
                selector.typeOfJournal = "income";
                selector.journalEntryItem = [];
                Meteor.call('addJournalEntryByOrder', selector, (error, result)=> {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        IonLoading.hide();
                    }
                });


                Meteor.call('updateOrderStatus', orderId, (error, result)=> {
                    if (error) {
                        sAlert.error(error.message);
                        IonLoading.hide();
                    } else {
                        Router.go(`/showOrder`);
                    }
                });
            },
            onCancel: function () {
                sAlert.warning('Cancel paid.');
            }
        });
    },
    'click .js-payment'(){
        let params = Router.current().params;
        let orderId = params.orderId;
        console.log(`orderId ${orderId}`);
        Router.go(`/itemOrder/orderId/${orderId}/payment`);
    },
    'click .js-cancelOrder'(){
        let params = Router.current().params;
        let orderId = params.orderId;
        IonPopup.confirm({
            title: 'Are you sure to cancel order?',
            template: `Order Id : ${orderId}?`,
            onOk: () => {
                Meteor.call('deleteOrder', orderId, (error, result) => {
                    if (error) {
                        sAlert.error(error.message);
                    } else {
                        Meteor.call('removeOrderDetailByOrder', orderId, (error, result)=> {
                            if (error) {
                                sAlert.error(error.message);
                            } else {
                                Meteor.call('removePayment', orderId, (error, result)=> {
                                    if (error) {
                                        sAlert.error(error.message);
                                    } else {
                                        Router.go('/showOrder');
                                        sAlert.success(`Order cancel success`);
                                    }
                                })
                            }
                        });
                    }
                });
            },
            onCancel: function () {
            }
        });
    }
});

Template.itemOrder.onDestroyed(function () {
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        Meteor.call('removeSaleIfNoSaleDetailExist', orderId, function (error, result) {
            if (error) {
                sAlert.error(error.message);
            }
        });
    }
});