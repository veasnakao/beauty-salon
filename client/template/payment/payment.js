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
                dueAmount: order.total,
                paidAmount: order.total,
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
        if (paidAmount === null || paidAmount === "") {
            let a = numeral(dueAmount);
            console.log(a)
            $('.js-paidAmount').val(a);
            $('.js-balance').val(0);
        } else {
            let balance = dueAmount - paidAmount;

            $('.js-balance').val(balance);
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

        Meteor.call('updateOrderStatus', orderId, (error, result)=> {
            if (error) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                Router.go(`/showOrder`);
            }
        });
    }
});

AutoForm.hooks({
    payment: {//id autoform
        before: {
            insert: function (doc) {
                let todayDate = moment().format('YYYYMMDD');
                let prefix = todayDate + '-';
                doc.status = 'paid';
                doc._id = idGenerator.genWithPrefix(Collection.Payment, prefix, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Payment success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});