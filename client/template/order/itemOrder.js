Tracker.autorun(function () {
    // if (Session.get('OrderId')) {
    //     Meteor.subscribe("journalEntrys");
    // }
});

//oncreated
Template.itemOrder.created = function () {
    Session.set('orderDetailObj', {});
    let selector = {
        status: 'active'
    };
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('staffActive',selector);
        this.subscription = Meteor.subscribe("customers");
        this.subscription = Meteor.subscribe("orderDetail", Router.current().params.orderId);
        this.subscription = Meteor.subscribe('order', Router.current().params.orderId);
        this.subscription = Meteor.subscribe('payment', Router.current().params.orderId);
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
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        if(order) {
            let staffId = order.staffId;
            if(staffId){
                $('.search-item').show();
            }else{
                $('.search-item').hide();
            }
        }
    } catch (e) {
        // console.log(e);
    }
};

//helper
Template.itemOrder.helpers({
    checkStatus(){
        if (Session.get('orderStatus') == 'active') {
            // let check = Session.get('orderStatus');
            return true
        }
        // else {
        //     let orderId = Router.current().params.orderId;
        //     let order = Collection.Order.findOne(orderId);
        //     let status = order.status;
        //     if (status == 'active') {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    },
    order() {
        let params = Router.current().params;
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        if (order) {
            let selector = {
                customerId: order.customerId,
                staffId: order.staffId,
                date: order.date
            };
            return selector;
        }
    },
    showOrderDetail(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let orderDetail = Collection.OrderDetail.find({orderId: orderId});
        if (orderDetail) {
            return orderDetail;
        }
    },
    showOrder(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        if (order) {
            return order;
        }
    },
    payment(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let payment = Collection.Payment.findOne({orderId: orderId}, {sort: {_id: -1}});
        if (payment) {
            return payment;
        }
    },
    checkDiscountType(discountType){
        if (discountType == 'c') {
            return true;
        }
    },
    serviceItem(){
        let item = Collection.Item.find().fetch();
        if(item) {
            return item;
        }
    }
});

//event
Template.itemOrder.events({
    'click [name="service-item"]'(){
        // console.log(this);
        let params = Router.current().params;
        let customerId = $('.js-customer');
        let staffId = $('.js-staff');
        let orderDate = Session.get('orderDate');
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: this._id,
            itemName: this.name,
            price: this.price,
            quantity: 1,
            discount: 0,
            amount: this.price * 1
        };
        if (selector) {
            Meteor.call('insertOrderDetail', selector, (error, result) => {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    });
                    IonLoading.hide();
                } else {
                    let orderId = params.orderId;
                    if (orderId) {
                        Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 3000,
                                    showConfirmButton: true
                                });
                                IonLoading.hide();
                            } else {
                                Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                                    if (error) {
                                        swal({
                                            title: "Error",
                                            text: error,
                                            type: "error",
                                            timer: 3000,
                                            showConfirmButton: true
                                        })
                                    } else {
                                        swal({
                                            title: "Success",
                                            text: "Service item add success",
                                            type: "success",
                                            timer: 800,
                                            confirmButtonColor: "#45B1FC",
                                            showConfirmButton: true
                                        });
                                        IonLoading.hide();
                                        Session.set('orderId', result);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    },
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
            Meteor.call('updateOrder', orderId, updateObj, (error, result)=> {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    });
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
            Meteor.call('updateOrder', orderId, updateObj, (error, result)=> {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    })
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
            Meteor.call('updateOrder', orderId, updateObj, (error, result)=> {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    })
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
        Meteor.call('insertOrderDetail', selector, (error, result) => {
            if (error) {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: true
                })
                IonLoading.hide();
            } else {
                let orderId = params.orderId;
                Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error",
                            timer: 3000,
                            showConfirmButton: true
                        })
                        IonLoading.hide();
                    } else {
                        Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 3000,
                                    showConfirmButton: true
                                })
                            } else {
                                swal({
                                    title: "Success",
                                    text: "Added success",
                                    type: "success",
                                    timer: 800,
                                    confirmButtonColor: "#45B1FC",
                                    showConfirmButton: true
                                });
                                IonLoading.hide();
                                Session.set('orderId', result);
                            }
                        });
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
                        Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 3000,
                                    showConfirmButton: true
                                })
                                IonLoading.hide();
                            } else {
                                Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                                    if (error) {
                                        swal({
                                            title: "Error",
                                            text: error,
                                            type: "error",
                                            timer: 3000,
                                            showConfirmButton: true
                                        })
                                    } else {
                                        swal({
                                            title: "Success",
                                            text: "Decrease quantity success",
                                            type: "success",
                                            timer: 900,
                                            confirmButtonColor: "#45B1FC",
                                            showConfirmButton: true
                                        })
                                        IonLoading.hide();
                                        Session.set('orderId', result);
                                    }
                                });
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
        if (orderDetail) {
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5591DF",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false, closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    Meteor.call('removeOrderDetail', orderDetail._id, (error, result) => {
                        if (error) {
                            swal({
                                title: "Error",
                                text: error,
                                type: "error",
                                timer: 3000,
                                showConfirmButton: true
                            })
                        } else {
                            let orderId = params.orderId;
                            Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                                if (error) {
                                    swal({
                                        title: "Error",
                                        text: error,
                                        type: "error",
                                        timer: 3000,
                                        showConfirmButton: true
                                    });
                                    IonLoading.hide();
                                } else {
                                    Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                                        if (error) {
                                            swal({
                                                title: "Error",
                                                text: error,
                                                type: "error",
                                                timer: 3000,
                                                showConfirmButton: true
                                            })
                                        } else {
                                            swal({
                                                title: "Success",
                                                text: "Service item delete success",
                                                type: "success",
                                                timer: 1000,
                                                confirmButtonColor: "#45B1FC",
                                                showConfirmButton: true
                                            });
                                            IonLoading.hide();
                                            Session.set('orderId', result);
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    swal({
                        title: "Cancelled",
                        type: "error"
                    });
                }
            });
        }
    },
    'click [name="delete-discount"]'(){
        let params = Router.current().params;
        let orderId = params.orderId;
        Meteor.call('deleteDiscount', orderId, (error, result)=> {
            if (error) {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: true
                })
            } else {
                Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error",
                            timer: 3000,
                            showConfirmButton: true
                        })
                    }
                });
            }
        })
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
                        swal({
                            title: "Error",
                            text: error,
                            type: "error",
                            timer: 3000,
                            showConfirmButton: true
                        })
                    } else {
                        Meteor.call('updateOrderStatus', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 3000,
                                    showConfirmButton: true
                                })
                            } else {
                                Router.go(`/showOrder`);
                            }
                        });
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
        let order = Collection.Order.findOne(orderId);
        if (order) {
            let customerId = order.customerId;
            let staffId = order.staffId;
            Router.go(`/itemOrder/orderId/${orderId}/staffId/${staffId}/customerId/${customerId}/payment`);
        }
    },
    'click .js-cancelOrder'(){
        let params = Router.current().params;
        let orderId = params.orderId;

        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5591DF",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false, closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteOrder', orderId, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        Meteor.call('removeOrderDetailByOrder', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error"
                                });
                            } else {
                                Meteor.call('removePayment', orderId, (error, result)=> {
                                    if (error) {
                                        swal({
                                            title: "Error",
                                            text: error,
                                            type: "error"
                                        });
                                    } else {
                                        Router.go('/showOrder');
                                        swal("Deleted!", "Your journal item has been deleted.", "success");
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                swal({
                    title: "Cancelled",
                    type: "error"
                });
            }
        });
    }
});

Template.itemOrder.onDestroyed(function () {
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        Meteor.call('removeSaleIfNoSaleDetailExist', orderId, function (error, result) {
            if (error) {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: true
                })
            }
        });
    }
});