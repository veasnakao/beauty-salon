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
    }
});

//events
Template.payment.events({
    'keyup .js-paidAmount'(){
        let dueAmount = $('.js-dueAmount').val();
        let paidAmount = $('.js-paidAmount').val();
        let balance = dueAmount - paidAmount;
        $('.js-balance').val(numeral(balance).format('00.00'));
        if ($('.js-balance') < 0 || $('.js-balance') == 0) {

        }
    },
    'keypress .js-paidAmount'(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .js-delete-payment'(){
        let params = Router.current().params;
        let serviceId = params._id;
        IonPopup.confirm({
            title: 'Are you sure to delete?',
            template: `Payment`,
            onOk: () => {
                Meteor.call('removePayment', serviceId, (error, result) => {
                    if (error) {
                        sAlert.error(`Cancel`);
                    } else {
                        overhang.notify({
                            type : "success",
                            message: "Delete success"
                        });
                        Router.go(`/showOrder`);
                        overhang.notify({
                            type : "success",
                            message: "Delete success"
                        });
                    }
                });
            },
            onCancel: function () {
            }
        });
    },
    'click .js-payment'(){
        debugger;
        let params = Router.current().params;
        let orderId = params.orderId;
        let paymentDate = $('.js-paymentDate').val();
        let selector = {};
        selector.date = paymentDate;
        selector.orderId = orderId;
        selector.typeOfJournal = "income";
        selector.journalEntryItem = [];
        Meteor.call('addJournalEntryByOrder', selector, (error, result)=> {
            if (error) {
                sAlert.error(error.message);
            } 
        });
    }
});

AutoForm.hooks({
    payment: {
        onSuccess(formType, id){
            Router.go('/showOrder');
            sAlert.success('Payment success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});
