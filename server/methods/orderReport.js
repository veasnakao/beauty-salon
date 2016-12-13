Meteor.methods({
    orderAllStaff(fromDate, toDate){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();

        let orderAllStaff = Collection.Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    },
                    // staffId: staffId
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
                    staffId: {
                        $last: "$staffId"
                    },
                    date: {
                        $last: "$date"
                    },
                    totalService: {
                        $sum: '$total'
                    },
                    totalDiscountAmount: {
                        $sum: '$discountAmount'
                    },
                    totalGrandTotal: {
                        $sum: '$grandTotal'
                    }
                }
            },
            {
                $group: {
                    _id: '$staffId',
                    staffName: {
                        $last: "$staffName"
                    },
                    totalServiceByDate: {
                        $addToSet: {
                            date: '$date',
                            totalService: '$totalService',
                            totalDiscountAmount: '$totalDiscountAmount',
                            totalGrandTotal: '$totalGrandTotal'
                        }
                    },
                    totalService: {
                        $sum: '$totalService'
                    },
                    totalDiscountAmount: {
                        $sum: "$totalDiscountAmount"
                    },
                    totalGrandTotal: {
                        $sum: "$totalGrandTotal"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: {
                            staff: '$staffName',
                            totalServiceByDate: '$totalServiceByDate',
                            subTotalServiceByDate:'$totalService',
                            subTotalDiscountByDate:'$totalDiscountAmount',
                            subTotalGrandTotalByDate:'$totalGrandTotal'
                        }
                    },
                    total: {
                        $sum: '$totalService'
                    },
                    totalDiscountAmount: {
                        $sum: '$totalDiscountAmount'
                    },
                    totalGrandTotal: {
                        $sum: '$totalGrandTotal'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        data.content = orderAllStaff;
        return data;
    },
    orderByStaff(fromDate, toDate, staffId){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();

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
                    staffId: {
                        $last: "$staffId"
                    },
                    date: {
                        $last: "$date"
                    },
                    totalService: {
                        $sum: '$total'
                    },
                    totalDiscountAmount: {
                        $sum: '$discountAmount'
                    },
                    totalGrandTotal: {
                        $sum: '$grandTotal'
                    }
                }
            },
            {
                $group: {
                    _id: '$staffId',
                    staffName: {
                        $last: "$staffName"
                    },
                    totalServiceByDate: {
                        $addToSet: {
                            date: '$date',
                            totalService: '$totalService',
                            totalDiscountAmount: '$totalDiscountAmount',
                            totalGrandTotal: '$totalGrandTotal'
                        }
                    },
                    totalService: {
                        $sum: '$totalService'
                    },
                    totalDiscountAmount: {
                        $sum: "$totalDiscountAmount"
                    },
                    totalGrandTotal: {
                        $sum: "$totalGrandTotal"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: {
                            staff: '$staffName',
                            totalServiceByDate: '$totalServiceByDate',
                            subTotalServiceByDate:'$totalService',
                            subTotalDiscountByDate:'$totalDiscountAmount',
                            subTotalGrandTotalByDate:'$totalGrandTotal'
                        }
                    },
                    total: {
                        $sum: '$totalService'
                    },
                    totalDiscountAmount: {
                        $sum: '$totalDiscountAmount'
                    },
                    totalGrandTotal: {
                        $sum: '$totalGrandTotal'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (orderByStaff) {
            data.content = orderByStaff;
            return data;
        }
    }
});