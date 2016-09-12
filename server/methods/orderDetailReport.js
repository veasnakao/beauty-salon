Meteor.methods({
    orderDetailReport(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();

        let orderDetail = Collection.Order.aggregate([
            {
                $match: {
                    date:{
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $lookup: {
                    from: "orderDetail",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderDetailDoc"
                }
            },
            {
                $unwind: { path: '$orderDetailDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "item",
                    localField: "orderDetailDoc.itemId",
                    foreignField: "_id",
                    as: "itemDoc"
                }
            },
            {
                $unwind: { path: '$itemDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "customer",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customerDoc"
                }
            },
            {
                $unwind: { path: '$customerDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "staff",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "staffDoc"
                }
            },
            {
                $unwind: { path: '$staffDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id:'$_id',
                    date:{
                        $last: "$date"
                    },
                    staff:{
                        $last: "$staffDoc.name"
                    },
                    customer:{
                        $last: "$customerDoc.name"
                    },
                    itemOrderDetail:{
                        $addToSet: {
                            itemName:'$itemDoc.name',
                            qty:'$orderDetailDoc.quantity',
                            price:'$orderDetailDoc.price',
                            discount:'$orderDetailDoc.discount',
                            amount:'$orderDetailDoc.amount'
                        }
                    },
                    subTotal:{
                        $last: "$total"
                    }
                }
            },
            {
                $group: {
                    _id:null,
                    data:{
                        $addToSet: '$$ROOT'
                    },
                    total:{
                        $sum: '$subTotal'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (orderDetail) {
            data.content = orderDetail;
            return data;
        }
    }
});