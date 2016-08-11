Tracker.autorun(function () {
    if (Session.get('paramsOrderId')) {
        Meteor.subscribe("order", Session.get('paramsOrderId'));
    }
});

Template.searchItem.created = function () {
    let orderId = Router.current().params.orderId;
    Session.set('limit', 10);
    this.autorun(() => {
        this.subscribe = Meteor.subscribe("staffs");
        this.subscribe = Meteor.subscribe("order", orderId);
        this.subscribe = Meteor.subscribe("customer", Router.current().params.customerId);
        this.subscribe = Meteor.subscribe("orderDetail", Router.current().params.orderId);
    });
};

//onRender
Template.searchItem.rendered = function () {
    Session.set('limit', 10);
};

//event
Template.searchItem.events({
    'keyup .js-search-item': function (event, template) {
        Session.set('searchQueryItem', event.target.value);
    },
    'click .close-modal': ()=> {
        // Session.set('searchQueryStaff', undefined);
        // Session.set('searchQueryItem', undefined);
    }
});

//helper
Template.searchItem.helpers({
    items: function () {
        let items = Collection.Item.search(Session.get('searchQueryItem'), Session.get('limit'));
        if (items) {
            return items;
        }
    },
    searchQueryItem: function () {
        return Session.get('searchQueryItem');
    },
    staffs: function () {
        let staffs = Collection.Staff.search(Session.get('searchQueryStaff'), Session.get('limit'));
        if (staffs) {
            return staffs;
        }
    },
    searchQueryStaff: function () {
        return Session.get('searchQueryStaff');
    }
});

Template.searchItem.events({
    'click .js-staff'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-item').prop('checked', false);
            $('.js-query-staff').show(500);
            $('.js-query-item').hide(500);
            Session.set('searchQueryItem', undefined);
        } else {
            $('.js-query-staff').hide(500);
            Session.set('searchQueryStaff', undefined);
            Session.set('searchQueryItem', undefined);
        }
    },
    'click .js-item'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-staff').prop('checked', false);
            $('.js-query-item').show(500);
            $('.js-query-staff').hide(500);
            Session.set('searchQueryStaff', undefined);
        } else {
            $('.js-query-item').hide(500);
            Session.set('searchQueryStaff', undefined);
            Session.set('searchQueryItem', undefined);
        }
    }
});


//onDestroyed
Template.searchItem.onDestroyed(function () {
    // Session.set('searchQueryItem', undefined);
    // Session.set('searchQueryStaff', undefined);
});

//template _productItem events
Template._productItem.events({
    'click .insert-order': function () {
        let params = Router.current().params;
        // let customerId = params.customerId;
        let customerId = $('.js-customer');
        let staffId = $('.js-staff');
        // let customer = Collection.Customer.findOne(customerId);
        // let customerName = customer.name;

        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: this._id,
            itemName: this.name,
            price: this.price,
            quantity: 1,
            discount: 0,
            amount: this.price * 1,
            // customerId: params.customerId,
            // customerId: customerId,
            // customerName: customerName
        };
        console.log(selector);

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
        console.log(`orderId : ${orderId}`);
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

