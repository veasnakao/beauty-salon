Meteor.methods({
    expense(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();

        let dayExpenseItems = Collection.DayExpense.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $unwind: '$expenseItem'
            },
            {
                $group: {
                    _id: null,
                    items: {
                        $addToSet: {
                            expenseItemName: '$expenseItem.expenseItemName',
                            price: '$expenseItem.price'
                        }
                    },
                    total: {
                        $sum: '$expenseItem.price'
                    }
                }
            }
        ]);
        let orders = Collection.Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $group: {
                    _id: 'null',
                    total: {
                        $sum: '$total'
                    }
                }
            }
            // {
            //     $group: {
            //         _id: {
            //             year: {
            //                 $year: '$date'
            //             },
            //             month: {
            //                 $month: '$date'
            //             },
            //             day: {
            //                 $dayOfMonth: '$date'
            //             }
            //         },
            //         total: {
            //             $sum: '$total'
            //         }
            //     }
            // }
        ]);
        let obj = {
            dayExpenseItems: dayExpenseItems,
            // orders: orders
            orders: _.isEmpty(orders) ? 0 : orders[0].total //orders[0]
        };
        let data = {};
        data.content = [];
        data.content.push(obj);
        console.log(data);
        return data;
    },
    // income(fromDate, toDate){
    //     fromDate = moment(fromDate).toDate();
    //     toDate = moment(toDate).toDate();
    //     let orders = Collection.Order.aggregate([
    //         {
    //             $match: {
    //                 date: {
    //                     $gte: fromDate, $lte: toDate
    //                 }
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: 'null',
    //                 total: {
    //                     $sum: '$total'
    //                 }
    //             }
    //         }
    //     ]);
    //     if (orders) {
    //         return orders;
    //     }
    // }
});