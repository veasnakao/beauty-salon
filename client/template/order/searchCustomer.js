Tracker.autorun(function () {
    if (Session.get('searchQueryCustomer')) {
        Meteor.subscribe('customerSearch', Session.get('searchQueryCustomer'), Session.get('limit'));
    }
});

//onCreate
Template.searchCustomer.created = function () {
    // this.autorun(function () {
    //     this.subscription = Meteor.subscribe('customers');
    // }.bind(this));
};

//onRender
Template.searchCustomer.rendered = function () {
    Session.set('limit', 10);
    let orderId = Session.get('orderId');
    if (!_.isUndefined(orderId)) {
        Meteor.call('removeSaleIfNoSaleDetailExist', orderId);
        Session.set('orderId', undefined);
    }
    $('.txt-searchCustomer').val("");
};


//helper searchCustomer
Template.searchCustomer.helpers({
    customer: function () {
        if (Session.get('searchQueryCustomer')) {
            let customers = Collection.Customer.search(Session.get('searchQueryCustomer'), Session.get('limit'));
            if (customers) {
                return customers;
            }
        }
    },
    searchQuery: function () {
        return Session.get('searchQueryCustomer');
    }
});

//event searchCustomer
Template.searchCustomer.events({
    'keyup input': function (event, template) {
        Session.set('searchQueryCustomer', event.target.value);
    },
    'click .close-modal': function () {
        Session.set('searchQueryCustomer', undefined);
    }
});

//onDestroyed searchCustomer
Template.searchCustomer.onDestroyed(function () {
    Session.set('searchQueryCustomer', undefined);
});


//_showCustomer event
Template._showCustomer.events({
    'click .customer-order': function () {
        Session.set('orderDetailObj', {});
        let selector = {};
        selector.date = new Date();
        selector.status = active;

        Meteor.call('insertOrder', selector, (err, result) => {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
                Router.go(`/itemOrder/orderId/${result}`);
            }
        })
    }
});


