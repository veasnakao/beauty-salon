//oncreated
Template.showOrder.created = function () {
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
    }.bind(this));
};

//onrender
Template.showOrder.rendered = function () {
    let orderId = Session.get('orderId');
    console.log(`oriderId : ${orderId}`);
    if (!_.isUndefined(orderId)) {
        Meteor.call('removeSaleIfNoSaleDetailExist', orderId);
        Session.set('orderId', undefined);
    }
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

//event
Template.showOrder.events({

});

//helper
Template.showOrder.helpers({
    showCustomerOrder: ()=> {
        let orderDetail = Collection.OrderDetail.find();
        return orderDetail;
        // order.forEach((obj)=>{
        //     let customerId = obj.customerId;
        //     console.log(`customId = ${customerId}`);
        //     let customer =  Collection.OrderDetail.find({customerId:customerId});
        //     // console.log(customer);
        //     customer.forEach((objCustomer)=>{
        //         console.log(objCustomer.itemName);
        //     });
        // });
        
        // customer
        // data.content = content;
        // return data;
    }
});
