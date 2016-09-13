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
        console.log(e);
    }
};

Template.payment.helpers({
    serviceReport(){
        if (Session.get('serviceReport')) {
            return Session.get('serviceReport');
        }
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
                dueAmount: numeral(payment.balance).format('00.00'),
                paidAmount: numeral(payment.balance).format('00.00'),
                balance: 0
            };
            return selector;
        }
        else {
            let order = Collection.Order.findOne(orderId);
            if (order) {
                let selector = {
                    orderId: order._id,
                    dueAmount: numeral(order.total).format('00.00'),
                    paidAmount: numeral(order.total).format('00.00'),
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
});

//events
Template.payment.events({
    'keyup .js-paidAmount'(){
        let dueAmount = $('.js-dueAmount').val();
        let paidAmount = $('.js-paidAmount').val();
        let balance = dueAmount - paidAmount;
        $('.js-balance').val(numeral(balance).format('00.00'));
    },
    'keypress .js-paidAmount'(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .js-delete-payment'(){
        let params = Router.current().params;
        let serviceId = params.orderId;
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `Payment`,
            onOk: () => {
                Meteor.call('removePayment', serviceId, (error, result) => {
                    if (error) {
                        sAlert.error(`Cancel`);
                    } else {
                        let status = 'active';
                        Meteor.call('updateOrderStatus', serviceId, status, (error, result)=> {
                            if (error) {
                                overhang.notify({
                                    type: "error",
                                    message: error
                                });
                            }else{
                                Meteor.call('removeJournalEntryByOrder', serviceId, (error, result)=> {
                                    if(error){
                                        overhang.notify({
                                            type: "error",
                                            message: error
                                        });
                                    }else{
                                        Router.go(`/showOrder`);
                                        overhang.notify({
                                            type: "success",
                                            message: "Delete success"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            onCancel: function () {
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
                    overhang.notify({
                        type: "error",
                        message: error
                    });
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
            // Router.go('/showOrder');
            Session.set('orderStatus', undefined);
            overhang.notify({
                type: "success",
                message: "Payment success"
            });
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});
Template.payment.onDestroyed(function () {
    Session.set('serviceReport', undefined);
});