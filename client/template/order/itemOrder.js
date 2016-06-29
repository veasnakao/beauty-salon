//oncreated
Template.itemOrder.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetail');
    }.bind(this));
};

//onrender
Template.itemOrder.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

//helper
Template.itemOrder.helpers({
    showOrderDetail: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        console.log(orderId);
        return Collection.OrderDetail.find();
        // return Collection.Order.find({}, {sort: {_id: 1}});
    }
});