Tracker.autorun(function () {
    if (Session.get('paramsOrderId')) {
        Meteor.subscribe("order", Session.get('paramsOrderId'));
    }
});

Template.searchItem.created = function () {
    let orderId = Router.current().params.orderId;
    Session.set('limit', 10);
    Session.set('orderDetailObj', {});
    // Session.set('saleDetailLimited', 5) // using for limit
    // Session.set('detachSaleDetailObj', {}) //using for detach sale detail
    this.autorun(() => {
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
    'keyup input': function (event, template) {
        Session.set('searchQueryItem', event.target.value);
    },
    'click .close-modal': ()=> {
        Session.set('searchQueryItem', undefined);
    }
});

//helper
Template.searchItem.helpers({
    items: function () {
        return Collection.Item.search(Session.get('searchQueryItem'), Session.get('limit'));
    },
    searchQuery: function () {
        return Session.get('searchQueryItem');
    }
});

Template._productItem.events({
    'click .insert-order': function () {
        // debugger;
        let params = Router.current().params;
        let customerId = params.customerId;
        let customer = Collection.Customer.findOne(customerId);
        let customerName = customer.name;
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: this._id,
            itemName: this.name,
            price: this.price,
            quantity: 1,
            discount: 0,
            amount: this.price*1,
            customerId: params.customerId,
            customerName: customerName
        };

        Meteor.call('insertOrderDetail', selector, (err, result) => {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        })
    }
});

//onDestroyed
Template._productItem.onDestroyed(function () {
    Session.set('searchQueryItem', undefined);
});
