Meteor.methods({
    insertOrderDetail(selector){
        let orderDetails = [];
        for (let k in selector) {
            orderDetails.push({
                orderId: selector[k].orderId,
                itemId: selector[k].itemId,
                itemName: selector[k].itemName,
                discount: selector[k].discount,
                amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price
            });
        }
        console.log(orderDetails);
        let order = Collection.Order.findOne(orderDetails[0].orderId);
        if (_.isUndefined(order)) {
            Meteor.defer(() => {
                Meteor._sleepForMs(200);
                orderDetails.forEach((orderDetails) => {
                    let orderId = orderDetails[0].orderId;
                    // let todayDate = moment().format('YYYYMMDD');
                    let prefix = orderId + '-';
                    orderDetails._id = idGenerator.genWithPrefix(Collection.OrderDetail, prefix, 4);

                    // orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
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
                        let orderId = orderDetails.orderId;
                        // let todayDate = moment().format('YYYYMMDD');
                        let prefix = orderId + '-';
                        orderDetails._id = idGenerator.genWithPrefix(Collection.OrderDetail, prefix, 4);

                        // orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
                        Collection.OrderDetail.insert(orderDetails);
                    } else {
                        updateExistOrderDetail(orderDetails, existOrderDetail);
                    }
                });
            })
        }
    },
    decreaseOrderQuantity(selector){
        let orderDetails = [];
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
        let order = Collection.Order.findOne(orderDetails[0].orderId);
        if (_.isUndefined(order)) {
            Meteor.defer(() => {
                Meteor._sleepForMs(200);
                orderDetails.forEach((orderDetails) => {
                    let orderId = orderDetails[0].orderId;
                    // let todayDate = moment().format('YYYYMMDD');
                    let prefix = orderId + '-';
                    orderDetails._id = idGenerator.genWithPrefix(Collection.OrderDetail, prefix, 4);
                    // orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
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
                        let orderId = orderDetails.orderId;
                        // orderDetails._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
                        // let todayDate = moment().format('YYYYMMDD');
                        let prefix = orderId + '-';
                        orderDetails._id = idGenerator.genWithPrefix(Collection.OrderDetail, prefix, 4);
                        // orderDetails._id = idGenerator.gen(Collection.OrderDetail, 4);
                        Collection.OrderDetail.insert(orderDetails);
                    } else {
                        decreaseExistOrderDetail(orderDetails, existOrderDetail);
                    }
                });
            })
        }
    },
    removeOrderDetail(id) {
        let orderDetail = Collection.OrderDetail.remove(id);
        if (orderDetail) {
            return orderDetail;
        }
    },
    removeOrderDetailByOrder(orderId){
        let orderDetail = Collection.OrderDetail.remove({orderId: orderId});
        if (orderDetail) {
            return orderDetail;
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
        if (orderDetail) {
            orderDetail.forEach((objOrderDetail)=> {
                subTotal += objOrderDetail.amount;
                console.log(`subTotal : ${subTotal}`);
            });
        }
        Collection.Order.update(orderId, {
            $set: {
                total: subTotal
            }
        })
    },
    // let updateObj={customerId:'001',staffId:'001'};
    // updateOrderCustomer('001',null,'003')
    //update orderCustomerId
    updateOrder(orderId, updateObj){
        Collection.Order.update(orderId, {
            $set: updateObj
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
    orderItemDetailByCustomer(status){
        let orderItemDetail = Collection.Order.aggregate([
            {
                $match: {
                    status: status,
                    total: {
                        $ne: 0
                    }
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
                $lookup: {
                    from: "payment",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "paymentDoc"
                }
            },
            {
                $unwind: {path: '$paymentDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$_id',
                    date: { $last: '$date' },
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
                        }
                    },
                    staff: {
                        $addToSet: {
                            staff: '$orderDoc.staffDoc.name'
                        }
                    },
                    paidAmount: {$last: '$paymentDoc.paidAmount'},
                    balance: {$last: '$paymentDoc.balance'},
                    // payment: {
                    //     $addToSet: {
                    //         paymentDate: '$paymentDoc.paymentDate',
                    //         dueAmount: '$paymentDoc.dueAmount',
                    //         paidAmount: '$paymentDoc.paidAmount',
                    //         balance: '$paymentDoc.balance',
                    //         status: '$paymentDoc.status'
                    //     }
                    // },
                    total: {
                        $sum: '$orderDoc.amount'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (orderItemDetail) {
            data.content = orderItemDetail;
            console.log(data);
            return data;
        }
    },
    paidOrder(){
        let orderItemDetail = Collection.Order.aggregate([
            {
                $match: {
                    status: "active"
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
                        }
                    },
                    staff: {
                        $addToSet: {
                            staff: '$orderDoc.staffDoc.name'
                        }
                    },
                    payment: {
                        $addToSet: {
                            paymentDate: '$paymentDoc.paymentDate',
                            dueAmount: '$paymentDoc.dueAmount',
                            paidAmount: '$paymentDoc.paidAmount',
                            balance: '$paymentDoc.balance',
                            status: '$paymentDoc.status'
                        }
                    },
                    total: {
                        $sum: '$orderDoc.amount'
                    }
                }
            }
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
