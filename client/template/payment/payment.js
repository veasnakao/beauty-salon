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
        let order = Collection.Order.findOne(Router.current().params.orderId);
        try {
            let selector = {
                orderId: order._id,
                //dueAmount: (order.total).toFixed(2),
                dueAmount: numeral(order.total).format('00.00'),
                paidAmount: numeral(order.total).format('00.00'),
                balance: 0
            };
            return selector;
        } catch (e) {
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
    'click .js-payment'(){
        let params = Router.current().params;
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

        // Meteor.call('updateOrderStatus', orderId, (error, result)=> {
        //     if (error) {
        //         sAlert.error(error.message);
        //         IonLoading.hide();
        //     } else {
        //         Router.go(`/showOrder`);
        //     }
        // });
    }
});

AutoForm.hooks({
    payment: {
        onSuccess(formType, id){
            sAlert.success('Payment success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});
