Meteor.methods({
    showIncomeByStaffDetail(id){
        let showIncomeByStaffDetail = Collection.IncomeByStaff.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $unwind: {path: '$incomeByStaff', preserveNullAndEmptyArrays: true}
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
                $unwind: {path: '$staffDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        incomeByStaffId: '$_id',
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                    },
                    total: {
                        $sum: '$incomeByStaff.amount'
                    },
                    incomeByStaff: {
                        $addToSet: {
                            date: '$date',
                            type: '$type',
                            name: '$staffDoc.name',
                            gender: '$staffDoc.gender',
                            amount: '$incomeByStaff.amount',
                        }
                    }
                }
            },
            {
                $unwind: {path: '$incomeByStaff', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$_id.incomeByStaffId',
                    date: {
                        $last: "$incomeByStaff.date"
                    },
                    total: {
                        $last: "$total"
                    },
                    incomeByStaff: {
                        $addToSet: '$incomeByStaff'
                    }
                }
            },
        ]);
        return showIncomeByStaffDetail;
    }
});