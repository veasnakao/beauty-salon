Meteor.methods({
    insertOrderDetail(selector){
        var orderDetails = [];
        for (let k in selector) {
            orderDetails.push({
                orderId: selector[k].orderId,
                itemId: selector[k].itemId,
                itemName: selector[k].itemName,
                discount: selector[k].discount,
                // amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price,
                customerId: selector[k].customerId,
                customerName: selector[k].customerName
            });
        }
        console.log(orderDetails);
        var order = Collection.Order.findOne(orderDetails[0].orderId);
        if (_.isUndefined(order)) {
            Meteor.defer(() => {
                Meteor._sleepForMs(200);
                orderDetails.forEach((orderDetails) => {
                    orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
                    Collection.OrderDetail.insert(orderDetails);
                });
            });
        } else {
            Meteor.defer(() => {
                orderDetails.forEach((orderDetails) => {
                    let existOrderDetail = Collection.OrderDetail.findOne({
                        orderId: orderDetails.orderId,
                        itemId: orderDetails.itemId
                    });
                    if (!existOrderDetail) {
                        // orderDetails._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
                        orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
                        Collection.OrderDetail.insert(orderDetails);
                    } else {
                        updateExistOrderDetail(orderDetails, existOrderDetail);
                    }
                });
            })
        }
    }
});

var updateExistOrderDetail = (currentOrderDetail, existOrderDetail) => {
    let newQty = currentOrderDetail.quantity + existOrderDetail.quantity;
    let totalAmount = (newQty * existOrderDetail.price) * (1 - existOrderDetail.discount / 100);
    Collection.OrderDetail.update(existOrderDetail._id, {
        $set: {
            amount: totalAmount,
            quantity: newQty
        }
    })
};