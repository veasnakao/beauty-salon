Template.payment.created = function () {
    let params = Router.current().params;
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('staffs');
        this.subscription = Meteor.subscribe("customers");
        this.subscription = Meteor.subscribe("payments");
        this.subscription = Meteor.subscribe("orderDetail", Router.current().params.orderId);
        this.subscription = Meteor.subscribe('order', Router.current().params.orderId);
    }.bind(this));
};

//onrender
Template.payment.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {
        // console.log(e);
    }
};

Template.payment.helpers({
    serviceReport(){
        if (Session.get('serviceReport')) {
            return Session.get('serviceReport');
        }
    },
    dueAmount(){

    },
    order() {
        let orderId = Router.current().params.orderId;
        let payment = Collection.Payment.findOne(
            {
                orderId: orderId
            },
            {
                sort: {_id: -1}
            }
        );
        if (payment) {
            let selector = {
                orderId: payment.orderId,
                paymentDate: payment.paymentDate,
                dueAmount: numeral(payment.paidAmount).format('00.00'),
                paidAmount: numeral(payment.paidAmount).format('00.00'),
                balance: 0
            };
            return selector;
        }
        else {
            let order = Collection.Order.findOne(orderId);
            if (order) {
                let selector = {
                    orderId: order._id,
                    paymentDate: order.date,
                    dueAmount: numeral(order.grandTotal).format('00.00'),
                    paidAmount: numeral(order.grandTotal).format('00.00'),
                    balance: 0
                };
                return selector;
            }
        }
    },
    checkPayment(){
        if (Session.get('orderStatus') == 'close') {
            return true
        }
    },
    checkStatus(){
        if (Session.get('orderStatus') == 'active') {
            return true
        }
    },
    checkDiscountType(type){
        if (type == 'c') {
            return true;
        }
    }
});

//events
Template.payment.events({
    'keyup [name="paidAmount"]'(){
        let dueAmount = $('.js-dueAmount').val();
        let paidAmount = $('.js-paidAmount').val();
        let balance = dueAmount - paidAmount;
        $('.js-balance').val(numeral(balance).format('00.00'));
    },
    'keypress [name="paidAmount"]'(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .js-delete-payment'(){
        let params = Router.current().params;
        let serviceId = params.orderId;
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
                Meteor.call('removePayment', serviceId, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text:error,
                            type:"error",
                            timer: 3000,
                            showConfirmButton: true
                        })
                    } else {
                        let status = 'active';
                        Meteor.call('updateOrderStatus', serviceId, status, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 2000,
                                    confirmButtonColor: "#DD6B55",
                                    showConfirmButton: true
                                })
                            } else {
                                Meteor.call('removeJournalEntryByOrder', serviceId, (error, result)=> {
                                    if (error) {
                                        swal({
                                            title: "Error",
                                            text: error,
                                            type: "error",
                                            timer: 2000,
                                            confirmButtonColor: "#DD6B55",
                                            showConfirmButton: true
                                        })
                                    } else {
                                        Router.go(`/showOrder`);
                                        swal({
                                            title: "Success",
                                            text: "Delete payment success",
                                            type: "success",
                                            timer: 2000,
                                            confirmButtonColor: "#45B1FC",
                                            showConfirmButton: true
                                        })
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
    },
    'click .js-generate'(){
        let params = Router.current().params;
        let serviceId = params.orderId;
        if (serviceId) {
            console.log(serviceId);
            Meteor.call('serviceReport', serviceId, (error, result)=> {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 2000,
                        confirmButtonColor: "#DD6B55",
                        showConfirmButton: true
                    })
                } else {
                    Session.set('serviceReport', result);
                }
            });
        }
    },
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
    }
});

AutoForm.hooks({
    payment: {
        onSuccess(formType, id){
            Session.set('orderStatus', 'close');
            Router.go('/showOrder');
            swal({
                title: "Success",
                text: "Payment success",
                type: "success",
                timer: 2000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 2000,
                confirmButtonColor: "#DD6B55",
                showConfirmButton: true
            })
        }
    }
});
Template.payment.onDestroyed(function () {
    Session.set('serviceReport', undefined);
});