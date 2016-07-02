//oncreated
Template.itemOrder.created = function () {
    let params = Router.current().params;
    let orderId = params.orderId;
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetails');
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
        // console.log(`orderId : ${orderId}`);
        return Collection.OrderDetail.find({orderId: orderId});
    },
    totalOrderDetail: ()=> {
        let params = Router.current().params;
        let orderId = params.orderId;
        console.log(`orderId : ${orderId}`);
        let orderDetail = Collection.OrderDetail.find({orderId: orderId});
        let totalPaid = 0;
        orderDetail.forEach((obj)=> {
            totalPaid += obj.price * obj.quantity;
        });
        return totalPaid;
    }
});