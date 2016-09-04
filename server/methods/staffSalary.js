Meteor.methods({
    staffSalary(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
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
                    as: "staffDoc"
                }
            },
            {
                $unwind: {path: '$staffDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $project: {
                    staffId: '$staffDoc._id',
                    date: '$date',
                    staffName: '$staffDoc.name',
                    gender: '$staffDoc.gender',
                    fee: '$staffDoc.fee',
                    baseSalary: '$staffDoc.baseSalary',
                    total: '$total',
                    subTotalFee: {
                        $multiply: [{$divide: ['$staffDoc.fee', 100]}, '$total']
                    }
                }
            },
            {
                $group: {
                    _id: '$staffId',
                    baseSalary: {
                        $addToSet: '$baseSalary'
                    },
                    totalFee: {
                        $sum: '$subTotalFee'
                    },
                    staffName: {
                        $addToSet: '$staffName'
                    },
                    gender: {
                        $addToSet: '$gender'
                    },
                    fee: {
                        $addToSet: '$fee'
                    }
                }
            },
            {
                $unwind: {path: '$baseSalary', preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: '$staffName', preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: '$gender', preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: '$fee', preserveNullAndEmptyArrays: true}
            },
            {
                $project: {
                    _id: '$_id',
                    staffName: '$staffName',
                    gender: '$gender',
                    fee: '$fee',
                    baseSalary: '$baseSalary',
                    totalFee: '$totalFee',
                    totalSalary: {
                        $add: ['$baseSalary', '$totalFee']
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: '$$ROOT'
                    },
                    total: {
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