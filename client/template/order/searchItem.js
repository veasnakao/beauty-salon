Tracker.autorun(function () {
    if (Session.get('paramsOrderId')) {
        Meteor.subscribe("order", Session.get('paramsOrderId'));
    }
});

Template.searchItem.created = function () {
    let orderId = Router.current().params.orderId;
    Session.set('limit', 10)
    Session.set('orderDetailObj', {});
    // Session.set('saleDetailLimited', 5) // using for limit
    // Session.set('detachSaleDetailObj', {}) //using for detach sale detail
    this.autorun(() => {
        this.subscribe = Meteor.subscribe("order", orderId);
        // this.subscribe = Meteor.subscribe("saleDetailCount", saleId);
        // this.subscribe = Meteor.subscribe('productCount');
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
        let params = Router.current().params;
        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: this._id,
            price: this.price,
            quantity: 1,
            discount: 0,
            customerId:params.customerId
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
