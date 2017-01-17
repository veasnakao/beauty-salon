//staff salary with order

// Meteor.methods({
//     staffSalary(fromDate, toDate){
//         fromDate = moment(fromDate).startOf('days').toDate();
//         toDate = moment(toDate).endOf('days').toDate();
//         let staffSalary = Collection.Order.aggregate([
//             {
//                 $match: {
//                     date: {
//                         $gte: fromDate, $lte: toDate
//                     }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "staff",
//                     localField: "staffId",
//                     foreignField: "_id",
//                     as: "staffDoc"
//                 }
//             },
//             {
//                 $unwind: { path: '$staffDoc', preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $group: {
//                     _id: {
//                         staffId: '$staffId',
//                         month: { $month: "$date" },
//                         day: { $dayOfMonth: "$date" },
//                         year: { $year: "$date" }
//                     },
//                     staffName: {
//                         $last: '$staffDoc.name'
//                     },
//                     baseSalary: {
//                         $last: "$staffDoc.baseSalary"
//                     },
//                     fee: {
//                         $last: "$staffDoc.fee"
//                     },
//                     staffId: {
//                         $last: "$staffId"
//                     },
//                     date: {
//                         $last: "$date"
//                     },
//                     totalService: {
//                         $sum: '$total'
//                     },
//                     totalDiscountAmount:{
//                         $sum:'$discountAmount'
//                     },
//                     totalGrandTotal:{
//                         $sum:'$grandTotal'
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$staffId',
//                     staffName: {
//                         $last: "$staffName"
//                     },
//                     fee: {
//                         $last: "$fee"
//                     },
//                     baseSalary: {
//                         $last: "$baseSalary"
//                     },
//                     totalService: {
//                         $last: '$totalService'
//                     },
//                     totalDiscountAmount:{
//                         $last: "$totalDiscountAmount"
//                     },
//                     totalGrandTotal:{
//                         $last: "$totalGrandTotal"
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     staffId: '$staffId',
//                     staffName: '$staffName',
//                     baseSalary: '$baseSalary',
//                     totalService: '$totalService',
//                     totalDiscountAmount:'$totalDiscountAmount',
//                     totalGrandTotal:'$totalGrandTotal',
//                     fee: '$fee',
//                     totalFee: {
//                         $multiply: [{ $divide: ['$fee', 100] }, '$totalGrandTotal']
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     staffId: '$staffId',
//                     staffName: '$staffName',
//                     baseSalary: '$baseSalary',
//                     totalService: '$totalService',
//                     totalDiscountAmount:'$totalDiscountAmount',
//                     totalGrandTotal:'$totalGrandTotal',
//                     fee: '$fee',
//                     totalFee: '$totalFee',
//                     totalSalary: {
//                         $sum: ['$baseSalary', '$totalFee']
//                     }
//                 }
//             },
//             {
//                 $sort: { _id: -1 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     data: {
//                         $addToSet: '$$ROOT'
//                     },
//                     totalBaseSalary:{
//                         $sum:'$baseSalary'
//                     },
//                     totalFee:{
//                         $sum:'$totalFee'
//                     },
//                     totalDiscountAmount:{
//                         $sum: '$totalDiscountAmount'
//                     },
//                     totalGrandTotal:{
//                         $sum:'$totalGrandTotal'
//                     },
//                     totalSalary: {
//                         $sum: '$totalSalary'
//                     }
//                 }
//             }
//         ]);
//         let data = {};
//         let content = [];
//         if (staffSalary) {
//             data.content = staffSalary;
//             return data;
//         }
//     }
// });

//staff salary with incomeByStaff
Meteor.methods({
    staffSalary(fromDate, toDate){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();
        let staffSalary = Collection.IncomeByStaff.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $unwind: { path: '$incomeByStaff', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "staff",
                    localField: "incomeByStaff.staffId",
                    foreignField: "_id",
                    as: "staffDoc"
                }
            },
            {
                $unwind: { path: '$staffDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id:'$staffDoc._id',
                    staffName:{
                        $last: "$staffDoc.name"
                    },
                    gender:{
                        $last: "$staffDoc.gender"
                    },
                    baseSalary:{
                        $last: "$staffDoc.baseSalary"
                    },
                    fee:{
                        $last: "$staffDoc.fee"
                    },
                    totalIncomeByStaff:{
                        $sum: '$incomeByStaff.amount'
                    }
                }
            },
            {
                $project: {
                    _id:1,
                    staffName:1,
                    gender:1,
                    baseSalary:1,
                    fee:1,
                    totalIncomeByStaff:1,
                    totalFee:{
                        $multiply: [{ $divide: ['$fee', 100] }, '$totalIncomeByStaff']
                    }
                }
            },
            {
                $project: {
                    _id:1,
                    staffName:1,
                    gender:1,
                    baseSalary:1,
                    fee:1,
                    totalIncomeByStaff:1,
                    totalFee:1,
                    totalSalary:{
                        $add: ["$baseSalary","$totalFee"]
                    }
                }
            },
            {
                $group: {
                    _id:null,
                    data:{
                        $addToSet: '$$ROOT'
                    },
                    totalIncomeByStaff:{
                        $sum: '$totalIncomeByStaff'
                    },
                    totalFee:{
                        $sum: '$totalFee'
                    },
                    totalBaseSalary:{
                        $sum: '$baseSalary'
                    },
                    totalSalary:{
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