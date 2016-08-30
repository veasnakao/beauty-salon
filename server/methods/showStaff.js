Meteor.methods({
    showStaff(){
        let showStaff = Collection.Order.aggregate([
            {
                $lookup: {
                    from: "staff",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "staffDoc"
                }
            }, {
                $unwind: {path: '$staffDoc', preserveNullAndEmptyArrays: true}
            }
        ]);
        if (showStaff) {
            return showStaff;
        }
    }
});