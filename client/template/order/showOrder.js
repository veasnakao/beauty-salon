//tracker
Tracker.autorun(function () {
    if (Session.get('orderStatus') == 'active') {
        let status = Session.get('orderStatus');
        // orderItemDetailByCustomer
        Meteor.call('orderItemDetailByCustomer', status, (error, result)=> {
            if (error) {
                sAlert.error(error.message);
            } else {
                console.log('render here');
                Session.set('orderByStaffResult', result);
            }
        });
    } else if (Session.get('orderStatus') == 'partial') {
        let searchVal = "";
        if (Session.get('serviceId')) {
            searchVal = Session.get('serviceId');
        } else {
            searchVal = "";
        }
        Meteor.call('allOrderItemDetailByCustomer', Session.get('activeSaleLimit'), searchVal, (error, result)=> {
            if (error) {
                sAlert.error(error.message);
            } else {
                Session.set('orderByStaffResult', result);
            }
        });
    } else {
        Session.set('orderByStaffResult', undefined);
    }
});

// //oncreated
Template.showOrder.created = function () {
    Session.set('activeSaleLimit', 5);
    Session.set('orderStatus', 'active');
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetails');
    }.bind(this));
};
//
// //onrender
Template.showOrder.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
        let status = Session.get('orderStatus');
        Meteor.call('orderItemDetailByCustomer', status, (error, result)=> {
            if (error) {
                sAlert.error(error.message);
            } else {
                console.log('render here');
                Session.set('orderByStaffResult', result);
            }
        });
    } catch (e) {
        console.log(e);
    }
};


//helper
Template.showOrder.helpers({
    checkStatus(){
        if (Session.get('orderStatus') == 'active') {
            return true
        }
    },
    checkPayment(){
        if (Session.get('orderStatus') == 'partial') {
            return true
        }
    },
    showCustomerOrder() {
        let order = Session.get('orderByStaffResult');
        if (!_.isEmpty(order)) {
            if (order.content.length > 0) {
                return order;
            } else {
                return false;
            }
        }
    }
});


Template.showOrder.events({
    'keyup [name="search"]'(){
        let serviceId = $("[name='search']").val();
        Session.set('serviceId', serviceId);
    },
    'click .js-load-more'(){
        let limit = Session.get('activeSaleLimit') + 5;
        Session.set('activeSaleLimit', limit);
    },
    'click .order-status'(e) {
        if ($(e.currentTarget).prop('checked')) {
            $('.check-status-label').text('Order');
            Session.set('orderStatus', 'active');
        } else {
            $('.check-status-label').text('Paid');
            Session.set('orderStatus', 'partial');
        }
    },
    'click .add-order'() {
        Session.set('orderDetailObj', {});
        let selector = {};
        selector.status = "active";
        Meteor.call('insertOrder', selector, (error, result) => {
            if (error) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
                Router.go(`/itemOrder/orderId/${result}`);
            }
        })
    },
    'click .show-order-item'() {
        let orderId = this._id;
        let order = Collection.Order.findOne(orderId);
        Router.go(`/itemOrder/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`);
    }
});

//event
Template.showOrder.onDestroyed(function () {
    Session.set('querySaleOrder', undefined);
    Session.set('orderByStaffResult', []);
});
