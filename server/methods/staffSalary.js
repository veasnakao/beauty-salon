Meteor.methods({
    staffSalary(fromDate, toDate){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();
        let staffSalary = Collection.Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
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
                    _id: {
                        staffId: '$staffId',
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" },
                        year: { $year: "$date" }
                    },
                    staffName: {
                        $last: '$staffDoc.name'
                    },
                    baseSalary: {
                        $last: "$staffDoc.baseSalary"
                    },
                    fee: {
                        $last: "$staffDoc.fee"
                    },
                    staffId: {
                        $last: "$staffId"
                    },
                    date: {
                        $last: "$date"
                    },
                    totalService: {
                        $sum: '$total'
                    },
                    totalDiscountAmount:{
                        $sum:'$discountAmount'
                    },
                    totalGrandTotal:{
                        $sum:'$grandTotal'
                    }
                }
            },
            {
                $group: {
                    _id: '$staffId',
                    staffName: {
                        $last: "$staffName"
                    },
                    fee: {
                        $last: "$fee"
                    },
                    baseSalary: {
                        $last: "$baseSalary"
                    },
                    totalService: {
                        $last: '$totalService'
                    },
                    totalDiscountAmount:{
                        $last: "$totalDiscountAmount"
                    },
                    totalGrandTotal:{
                        $last: "$totalGrandTotal"
                    }
                }
            },
            {
                $project: {
                    staffId: '$staffId',
                    staffName: '$staffName',
                    baseSalary: '$baseSalary',
                    totalService: '$totalService',
                    totalDiscountAmount:'$totalDiscountAmount',
                    totalGrandTotal:'$totalGrandTotal',
                    fee: '$fee',
                    totalFee: {
                        $multiply: [{ $divide: ['$fee', 100] }, '$totalGrandTotal']
                    }
                }
            },
            {
                $project: {
                    staffId: '$staffId',
                    staffName: '$staffName',
                    baseSalary: '$baseSalary',
                    totalService: '$totalService',
                    totalDiscountAmount:'$totalDiscountAmount',
                    totalGrandTotal:'$totalGrandTotal',
                    fee: '$fee',
                    totalFee: '$totalFee',
                    totalSalary: {
                        $sum: ['$baseSalary', '$totalFee']
                    }
                }
            },
            {
                $sort: { _id: -1 }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: '$$ROOT'
                    },
                    totalBaseSalary:{
                        $sum:'$baseSalary'
                    },
                    totalFee:{
                        $sum:'$totalFee'
                    },
                    totalDiscountAmount:{
                        $sum: '$totalDiscountAmount'
                    },
                    totalGrandTotal:{
                        $sum:'$totalGrandTotal'
                    },
                    totalSalary: {
                        $sum: '$totalSalary'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (staffSalary) {
            data.content = staffSalary;
            return data;
        }
    }
});