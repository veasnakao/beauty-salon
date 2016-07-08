Collection.OrderDetail.after.update(function (userId, doc, fieldNames, modifier, options) {
    updateOrderDetail(doc.orderId);
    // Meteor.defer(function () {
    //     var sale = Pos.Collection.Sales.findOne(doc.saleId);
    //     var saleDate = sale.saleDate;
    //     checkPromotion(doc, saleDate);
    // });
});

function updateOrderDetail(orderId){
    let subTotal = 0;
    let orderDetails = Collection.OrderDetail.find({orderId: orderId});
    orderDetails.forEach((objOrderDetail)=> {
        subTotal += objOrderDetail.amount;
    });
    console.log(`subTotal : ${subTotal}`);
    Collection.Order.update(orderId, {
        $set: {
            total: subTotal
        }
    })
}