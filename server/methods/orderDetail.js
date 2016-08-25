Meteor.methods({
    insertOrderDetail(selector){
        var orderDetails = [];
        for (let k in selector) {
            orderDetails.push({
                orderId: selector[k].orderId,
                itemId: selector[k].itemId,
                itemName: selector[k].itemName,
                discount: selector[k].discount,
                amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price,
                // customerId: selector[k].customerId,
                // customerName: selector[k].customerName
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
    },
    decreaseOrderQuantity(selector){
        var orderDetails = [];
        for (let k in selector) {
            orderDetails.push({
                orderId: selector[k].orderId,
                itemId: selector[k].itemId,
                itemName: selector[k].itemName,
                discount: selector[k].discount,
                amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price,
                // total:selector[k].price*selector[k].quantity,
                // customerId: selector[k].customerId,
                // customerName: selector[k].customerName
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
                        decreaseExistOrderDetail(orderDetails, existOrderDetail);
                    }
                });
            })
        }
    },
    removeOrderDetail(id) {
        Collection.OrderDetail.remove(id);
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

var decreaseExistOrderDetail = (currentOrderDetail, existOrderDetail) => {
    let newQty = existOrderDetail.quantity - currentOrderDetail.quantity;
    let totalAmount = (newQty * existOrderDetail.price) * (1 - existOrderDetail.discount / 100);
    Collection.OrderDetail.update(existOrderDetail._id, {
        $set: {
            amount: totalAmount,
            quantity: newQty
        }
    })
};

//update orderTotal
Meteor.methods({
    //update orderTotal
    updateOrderTotal(orderId){
        let subTotal = 0;
        let orderDetail = Collection.OrderDetail.find({orderId: orderId});
        if(orderDetail){
            orderDetail.forEach((objOrderDetail)=> {
                subTotal += objOrderDetail.amount;
                console.log(`subTotal : ${subTotal}`);
            });
            Collection.Order.update(orderId, {
                $set: {
                    total: subTotal
                }
            })
        }

    },

    //update orderCustomerId
    updateOrderCustomerId(orderId, customerId){
        Collection.Order.update(orderId, {
            $set: {
                customerId: customerId
            }
        })
    },

    //update orderStaffId
    updateOrderStaffId(orderId, staffId){
        Collection.Order.update(orderId, {
            $set: {
                staffId: staffId
            }
        })
    }
});

//orderItemDetailByCustomer
Meteor.methods({
    orderItemDetailByCustomer(){
        let orderItemDetail = Collection.Order.aggregate([
            {
                $match: {
                    status:'active',
                    total: {$ne: 0}
                    // total: {$exists: true}
                }
            },
            {
                $lookup: {
                    from: "orderDetail",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderDoc"
                }
            },
            {
                $unwind: {path: '$orderDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "item",
                    localField: "orderDoc.itemId",
                    foreignField: "_id",
                    as: "orderDoc.itemDoc"
                }
            },
            {$unwind: {path: '$orderDoc.itemDoc', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "customer",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customerDoc"
                }
            },
            {$unwind: {path: '$customerDoc', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "staff",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "orderDoc.staffDoc"
                }
            },
            {
                $unwind: {path: '$orderDoc.staffDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$_id',
                    // _id: {
                    //     id:'$_id',
                    //     customerId:'$customerDoc.customerDoc._id',
                    //     itemId:'$orderDoc.itemDoc._id'
                    // },
                    items: {
                        $addToSet: {
                            itemName: '$orderDoc.itemDoc.name',
                            price: '$orderDoc.price',
                            qty: '$orderDoc.quantity',
                            discount: '$orderDoc.discount',
                            amount: '$orderDoc.amount',
                            staff: '$orderDoc.staffDoc.name',
                            date: '$date',
                            customer: '$customerDoc.name'

                        }
                    },
                    customer: {
                        $addToSet: {
                            customer: '$customerDoc.name',
                            staff: '$orderDoc.staffDoc.name'
                        }
                    },
                    total: {
                        $sum: '$orderDoc.amount'
                    }
                }
            },
            {$sort: {_id: 1}}
        ]);
        let data = {};
        let content = [];
        if (orderItemDetail) {
            data.content = orderItemDetail;
            console.log(data);
            return data;
        }
    }
});
