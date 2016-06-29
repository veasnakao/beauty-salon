Meteor.methods({
    insertOrderDetail(selector){
        var orderDetails = [];
        for (let k in selector) {
            orderDetails.push({
                orderId: selector[k].orderId,
                itemId: selector[k].itemId,
                discount: selector[k].discount,
                // amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price,
                customerId:selector[k].customerId
            });
        }
        console.log(orderDetails);
        Meteor.defer(() => {
            Meteor._sleepForMs(200);
            orderDetails.forEach((orderDetails) => {
                orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
                // orderDetails.transferOrSplit = false;
                Collection.OrderDetail.insert(orderDetails);
            });
        });
    }
});