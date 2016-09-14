Collection.OrderDetail.after.update(function (userId, doc, fieldNames, modifier, options) {
    updateOrderDetail(doc.orderId);
    updateGrandTotal(doc.orderId);
});

function updateOrderDetail(orderId){
    let subTotal = 0;
    let orderDetails = Collection.OrderDetail.find({orderId: orderId});
    orderDetails.forEach((objOrderDetail)=> {
        subTotal += objOrderDetail.amount;
    });
    Collection.Order.update(orderId, {
        $set: {
            total: subTotal
        }
    });
}

function updateGrandTotal(orderId) {
    let grandTotal = 0;
    let discountAmount = 0;
    let order = Collection.Order.findOne({_id: orderId});
    if (order) {
        let total = order.total;
        let discountType = order.discountType;
        let discountVal = order.discountVal;
        discountAmount = order.discountAmount;
        if (discountType == 'c') {
            discountAmount = discountVal;
            grandTotal = total - discountAmount;
        } else if (discountType == 'p') {
            discountAmount = (discountVal / 100) * total;
            grandTotal = total - discountAmount;
        } else {
            grandTotal = total;
        }
    }
    Collection.Order.update(orderId,{
        $set:{
            discountAmount:discountAmount,
            grandTotal:grandTotal
        }
    })
}