Tracker.autorun(function () {
    // if (Session.get('paramsOrderId')) {
    //     Meteor.subscribe("order", Session.get('paramsOrderId'));
    // }
    if (Session.get('limit')) {
        return Session.get('limit');
    }
});

Template.searchItem.created = function () {
    let orderId = Router.current().params.orderId;
    Session.set('limit', 10);
    this.autorun(() => {
        this.subscribe = Meteor.subscribe("staffs");
        this.subscribe = Meteor.subscribe("order", orderId);
        this.subscribe = Meteor.subscribe("customers");
        this.subscribe = Meteor.subscribe("items");
        this.subscribe = Meteor.subscribe("orderDetail", Router.current().params.orderId);
    });
};

//onRender
Template.searchItem.rendered = function () {
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

//event
Template.searchItem.events({
    'click .js-load-more'(){
        let limit = Session.get('limit') + 5;
        Session.set('limit', limit);
    },
    'keyup .js-search-item': (event, template)=> {
        Session.set('searchQueryItem', event.target.value);
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
    // staffs: function () {
    //     let staffs = Collection.Staff.search(Session.get('searchQueryStaff'), Session.get('limit'));
    //     if (staffs) {
    //         return staffs;
    //     }
    // },
    // searchQueryStaff: function () {
    //     return Session.get('searchQueryStaff');
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
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    });
                    IonLoading.hide();
                } else {
                    let orderId = params.orderId;
                    if (orderId) {
                        Meteor.call('updateOrderTotal', orderId, (error, result)=> {
                            if (error) {
                                swal({
                                    title: "Error",
                                    text: error,
                                    type: "error",
                                    timer: 3000,
                                    showConfirmButton: true
                                });
                                IonLoading.hide();
                            } else {
                                Meteor.call('updateGrandTotal', orderId, (error, result)=> {
                                    if (error) {
                                        swal({
                                            title: "Error",
                                            text: error,
                                            type: "error",
                                            timer: 3000,
                                            showConfirmButton: true
                                        })
                                    } else {
                                        swal({
                                            title: "Success",
                                            text: "Service item add success",
                                            type: "success",
                                            timer: 800,
                                            confirmButtonColor: "#45B1FC",
                                            showConfirmButton: true
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

