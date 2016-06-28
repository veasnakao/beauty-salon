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
    }
})