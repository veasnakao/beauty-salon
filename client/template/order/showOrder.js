//oncreated
Template.showOrder.created = function () {
    Session.set('orderDetailObj', {});
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetails');
        // let status = true;
        // this.subscription = Meteor.subscribe('orderFindOne',status);
    }.bind(this));
    
};

//onrender
Template.showOrder.rendered = function () {
    let orderId = Session.get('orderId');
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
    'click .show-order-item': ()=> {
        let orders = Collection.Order.findOne({"status": "true"});
        let orderId = orders._id;
        let customer = Collection.Customer.findOne({_id: orders.customerId});
        console.log(`customerId : ${customer._id}`);
        let customerId = customer._id;
        Router.go(`/itemOrder/customerId/${customerId}/orderId/${orderId}`);


        // let data = {};
        // let content = [];
        // let orders = Collection.Order.findOne({"status": "true"});
        // let orderDetails = Collection.OrderDetail.find({orderId: orders._id});
        // orderDetails.forEach((obj)=> {
        //     content.push(obj);
        // });
        //
        // orders.forEach((objOrders)=> {
        //     let customerId = objOrders.customerId;
        //     let orderId = objOrders._id;
        //     console.log(`customId = ${customerId}`);
        //     console.log(`orderId = ${orderId}`);
        //     let orderDetails = Collection.OrderDetail.find({orderId: orderId});
        //     orderDetails.forEach((objOrderDetails)=> {
        //         let orderDetailCustomerId = objOrderDetails.customerId;
        //         let orderDetailOrderId = objOrderDetails.ordered;
        //         objOrderDetails.orderDetailCustomerId = orderDetailCustomerId;
        //         objOrderDetails.orderDetailOrderId = orderDetailOrderId;
        //         content.push(objOrderDetails);
        //     });
        //     // data.content = content;
        //     // console.log(data.content);
        //     // console.log(data.content);
        // });
    }
});

//helper
Template.showOrder.helpers({
    showCustomerOrder: ()=> {
        let data = {};
        let content = [];
        let orders = Collection.Order.find({"status": "true"});
        orders.forEach((objOrders)=> {
            let customerName = "";
            let customerId = objOrders.customerId;
            let customers = Collection.Customer.find({_id:customerId});
            customers.forEach((objCustomers)=>{
                customerName = objCustomers.name;
                objCustomers._customerName = customerName;
                content.push(objCustomers)
            });
        });
        data.content = content;
        return data;
    },
    showItemOrder: ()=> {
        // let data = {};
        // let content = [];
        // let orders = Collection.Order.find({"status": "true"});
        // orders.forEach((objOrders)=> {
        //     // let itemName = "";
        //     let orderId = objOrders._id;
        //     let orderDetails = Collection.OrderDetail.find({orderId:orderId});
        //     orderDetails.forEach((objOrderDetails)=> {
        //         let itemName = objOrderDetails.itemName;
        //         let customerName = objOrderDetails.customerName;
        //         console.log(itemName);
        //         objOrderDetails._itemName = itemName;
        //         objOrderDetails._customerName = customerName;
        //         content.push(objOrderDetails);
        //     });
        // });
        // // data.customer = _customerName;
        // data.content = content;
        // return data;
    }
});
