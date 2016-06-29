Tracker.autorun(function() {
    if (Session.get('searchQueryCustomer')) {
        Meteor.subscribe('customerSearch', Session.get('searchQueryCustomer'), Session.get('limit'));
    }
});

//onRender
Template.searchCustomer.rendered = function () {
    Session.set('limit', 10);
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        // Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
        Session.set('orderId', undefined);
    }
    $('.txt-searchCustomer').val("");
};

//event
Template.searchCustomer.events({
    'keyup input': function (event, template) {
        Session.set('searchQueryCustomer', event.target.value);
    }
});

//helper
Template.searchCustomer.helpers({
    customer: function () {
        return Collection.Customer.search(Session.get('searchQueryCustomer'), Session.get('limit'));
    },
    searchQuery: function () {
        return Session.get('searchQueryCustomer');
    }
});

Template._showCustomer.helpers({

});

Template._showCustomer.events({
    'click': function() {
        Session.set("searchQueryCustomer", this._id);
    },
    'click .customer-order':function () {
        Session.set('orderDetailObj', {});
        let customerId = this._id;
        let selector = {};
        selector.date = new Date();
        selector.customerId = customerId;

        Meteor.call('insertOrder', selector, (err, result) => {
            if (err) {
                // Bert.alert(err.message,'danger', 'growl-bottom-right');
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
                Router.go(`/itemOrder/customerId/${customerId}/orderId/${result}`);
                // Router.go(`/restaurant/sale/${tableLocationId}/table/${tableId}/saleInvoice/${result}`);
                //  Router.go(`/restaurant/saleList/location/${tableLocationId}/table/${tableId}/checkout/${result}`);
            }
        })
    }
});
