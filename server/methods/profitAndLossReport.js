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
        let data = {};
        let content = [];
        if (dayExpenseItems) {
            console.log(dayExpenseItems);
            data.content = dayExpenseItems;
            return data;
        }
    },
    income(fromDate, toDate){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
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
        ]);
        let data = {};
        let content = [];
        if (orders) {
            console.log(orders);
            data.content = orders;
            return data;
        }
    }
});