Meteor.methods({
    insertOrder(selector){
        selector._id = idGenerator.gen(Collection.Order, 4);
        var orderId = Collection.Order.insert(selector);
        return orderId;
    },
    removeSaleIfNoSaleDetailExist(orderId) {
        Meteor.defer(() => {
            Meteor._sleepForMs(500);
            let orderDetail = Collection.OrderDetail.find({
                orderId: orderId
            });
            console.log(orderId);
            if (orderDetail.count() <= 0) {
                Collection.Order.remove(orderId);
            }
        });
    }
});