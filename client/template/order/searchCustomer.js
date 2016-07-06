Tracker.autorun(function () {
    if (Session.get('searchQueryCustomer')) {
        Meteor.subscribe('customerSearch', Session.get('searchQueryCustomer'), Session.get('limit'));
    }
});

//onCreate
Template.searchCustomer.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customers');
    }.bind(this));
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

//event
Template.searchCustomer.events({
    'keyup input': function (event, template) {
        Session.set('searchQueryCustomer', event.target.value);
    },
    'click .close-modal':function(){
        Session.set('searchQueryCustomer', undefined);
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

Template._showCustomer.helpers({});

Template._showCustomer.events({
    // 'click': function() {
    //     Session.set("searchQueryCustomer", this._id);
    // },
    'click .customer-order': function () {
        // debugger;
        Session.set('orderDetailObj', {});
        let customerId = this._id;
        let selector = {};
        selector.date = new Date();
        selector.customerId = customerId;
        selector.status = true;
        // console.log(`customerId : ` + this._id);

        Meteor.call('insertOrder', selector, (err, result) => {
            if (err) {
                sAlert.error(error.message);
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
                Router.go(`/itemOrder/customerId/${customerId}/orderId/${result}`);
            }
        })
    }
});

//onDestroyed
Template._showCustomer.onDestroyed(function(){
    Session.set('searchQueryCustomer', undefined);
});
