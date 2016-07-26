Meteor.methods({
    orderAllStaff(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();

        let orderAllStaff = Collection.Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
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
                $group: {
                    _id: 'null',
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
                    total: {
                        $sum: '$orderDoc.amount'
                    }
                }
            },
            {$sort: {_id: 1}}
        ]);
        let data = {};
        let content = [];
        data.content = orderAllStaff;
        return data;
    },
    orderByStaff(fromDate, toDate, staffId){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();

        let orderByStaff = Collection.Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    },
                    staffId: staffId
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
                    _id: '$staffDoc._id',
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
                    total: {
                        $sum: '$orderDoc.amount'
                    }
                }
            },
            {$sort: {_id: 1}}
        ]);
        let data = {};
        let content = [];
        if(orderByStaff){
            data.content = orderByStaff;
            return data;
        }
    }
});