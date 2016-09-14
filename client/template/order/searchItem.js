Tracker.autorun(function () {
    if (Session.get('paramsOrderId')) {
        Meteor.subscribe("order", Session.get('paramsOrderId'));
    }
});

Template.searchItem.created = function () {
    let orderId = Router.current().params.orderId;
    // Session.set('limit', 10);
    this.autorun(() => {
        this.subscribe = Meteor.subscribe("staffs");
        this.subscribe = Meteor.subscribe("order", orderId);
        this.subscribe = Meteor.subscribe("customers");
        this.subscribe = Meteor.subscribe("orderDetail", Router.current().params.orderId);
    });
};

//onRender
Template.searchItem.rendered = function () {
    // Session.set('limit', 10);
};

//event
Template.searchItem.events({
    'keyup .js-search-item': (event, template)=> {
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
        let items = Collection.Item.search(Session.get('searchQueryItem'));//, Session.get('limit')
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
    // 'click .js-staff'(e){
    //     if ($(e.currentTarget).prop('checked')) {
    //         $('.js-item').prop('checked', false);
    //         $('.js-query-staff').show(500);
    //         $('.js-query-item').hide(500);
    //         Session.set('searchQueryItem', undefined);
    //     } else {
    //         $('.js-query-staff').hide(500);
    //         Session.set('searchQueryStaff', undefined);
    //         Session.set('searchQueryItem', undefined);
    //     }
    // },
    // 'click .js-item'(e){
    //     if ($(e.currentTarget).prop('checked')) {
    //         $('.js-staff').prop('checked', false);
    //         $('.js-query-item').show(500);
    //         $('.js-query-staff').hide(500);
    //         Session.set('searchQueryStaff', undefined);
    //     } else {
    //         $('.js-query-item').hide(500);
    //         Session.set('searchQueryStaff', undefined);
    //         Session.set('searchQueryItem', undefined);
    //     }
    // }
});


//template _productItem events
Template._productItem.events({
    'click .insert-order'() {
        $('this').css('background-color', '#00cc00');
        let params = Router.current().params;
        let customerId = $('.js-customer');
        let staffId = $('.js-staff');
        let orderDate = Session.get('orderDate');

        let selector = Session.get('orderDetailObj');
        selector[this._id] = {
            orderId: params.orderId,
            itemId: this._id,
            itemName: this.name,
            price: this.price,
            quantity: 1,
            discount: 0,
            amount: this.price * 1
        };
        if (selector) {
            Meteor.call('insertOrderDetail', selector, (error, result) => {
                if (error) {
                    sAlert.error(error.message);
                    IonLoading.hide();
                } else {
                    let orderId = params.orderId;
                    if (orderId) {
                        Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                            if (error) {
                                sAlert.error(error.message);
                                IonLoading.hide();
                            } else {
                                Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                                    if (error) {
                                        sAlert.error(error.message);
                                    } else {
                                        overhang.notify({
                                            type: "success",
                                            message: "Added success"
                                        });
                                        IonLoading.hide();
                                        Session.set('orderId', result);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
});

//onDestroyed
Template.searchItem.onDestroyed(function () {
    Session.set('searchQueryItem', undefined);
});

