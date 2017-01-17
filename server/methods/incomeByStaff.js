Meteor.methods({
    incomeByStaff(fromDate, toDate){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();
        let incomeByStaff = Collection.IncomeByStaff.aggregate([
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
                    totalIncomeByStaff:{
                        $sum: '$incomeByStaff.amount'
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
                        $sum: '$totalIncomeByStaff'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (incomeByStaff) {
            data.content = incomeByStaff;
            return data;
        }
    }
});