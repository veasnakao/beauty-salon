Meteor.methods({
    insertOrder(selector){
        selector._id = idGenerator.gen(Collection.Order, 4);
        var customer = Collection.Customer.findOne({}, {
            sort: {
                _id: 1
            }
        });
        selector.customerId = customer._id;
        var orderId = Collection.Order.insert(selector);
        return orderId;
    },
    removeSaleIfNoSaleDetailExist(orderId) {
        Meteor.defer(() => {
            Meteor._sleepForMs(500);
            let orderDetail = Collection.OrderDetail.find({
                orderId: orderId
            });
            if (orderDetail.count() <= 0) {
                Collection.Order.remove(orderId);
            }
        });
    }
});