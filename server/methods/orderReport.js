Meteor.methods({
    orderAllStaff(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();

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
                $unwind: {path: '$staffDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        staffId: '$staffId',
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"}
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
                            totalService: '$totalService'
                        }
                    },
                    totalService: {
                        $addToSet: '$totalService'
                    }
                }
            },
            {
                $unwind: {path: '$totalService', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: {
                            name: '$staffName',
                            totalServiceByDate: '$totalServiceByDate'
                        }
                    },
                    total: {
                        $sum: '$totalService'
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
                $group: {
                    _id: {
                        staffId: '$staffId',
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"}
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
                            totalService: '$totalService'
                        }
                    },
                    totalService: {
                        $addToSet: '$totalService'
                    }
                }
            },
            {
                $unwind: {path: '$totalService', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: {
                            name: '$staffName',
                            totalServiceByDate: '$totalServiceByDate'
                        }
                    },
                    total: {
                        $sum: '$totalService'
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