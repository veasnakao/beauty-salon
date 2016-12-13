Meteor.methods({
    profitAndLoss(fromDate, toDate){
        fromDate = moment(fromDate).startOf('days').toDate();
        toDate = moment(toDate).endOf('days').toDate();
        let profitAndLoss = Collection.JournalEntry.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $unwind: {path: '$journalEntryItem', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "journalItem",
                    localField: "journalEntryItem.journalItemId",
                    foreignField: "_id",
                    as: "journalDoc"
                }
            },
            {
                $unwind: {path: '$journalDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "order",
                    localField: "orderId",
                    foreignField: "_id",
                    as: "serviceDoc"
                }
            },
            {
                $unwind: {path: '$serviceDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        journalType: '$typeOfJournal',
                        journalItemId: '$journalEntryItem.journalItemId'
                    },
                    date: {
                        $last: "$date"
                    },
                    journalType: {
                        $last: "$typeOfJournal"
                    },
                    journalItem: {
                        $addToSet: {
                            journalItemId: '$journalEntryItem.journalItemId',
                            journalItemName: '$journalDoc.journalItemName',
                            journalItemPrice: '$journalEntryItem.journalItemPrice'
                        }
                    },
                    journalTotalByItem: {
                        $sum: '$journalEntryItem.journalItemPrice'
                    },
                    serviceTotal: {
                        $sum: '$serviceDoc.grandTotal'
                    }
                }
            },
            {
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        journalType: '$journalType',
                        journalItemId: '$journalItem.journalItemId'
                    },
                    date: {
                        $last: "$date"
                    },
                    journalType: {
                        $last: "$journalType"
                    },
                    journalItem: {
                        $addToSet: {
                            journalItemName: '$journalItem.journalItemName',
                            journalTotalByItem: '$journalTotalByItem'
                        }
                    },
                    serviceTotal: {
                        $last: "$serviceTotal"
                    }
                }
            },
            {
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$journalType',
                    date: {
                        $last: "$date"
                    },
                    journalType: {
                        $last: '$journalType'
                    },
                    journalItem: {
                        $addToSet: {
                            journalItemName: '$journalItem.journalItemName',
                            journalTotalByItem: '$journalItem.journalTotalByItem'
                        }
                    },
                    journalTotal: {
                        $sum: '$journalItem.journalTotalByItem'
                    },
                    serviceTotal: {
                        $sum: "$serviceTotal"
                    }
                }
            },
            {
                $project: {
                    date: 1,
                    journalType: 1,
                    journalItem: 1,
                    journalTotal: 1,
                    serviceTotal: 1,
                    total: {
                        $add: ["$journalTotal", "$serviceTotal"]
                    }
                }
            },
            {
                $sort: {
                    journalType:-1
                }
            }
        ]);
        let data = {};
        let content = [];
        if (profitAndLoss) {
            let totalIncome = 0;
            let totalExpense = 0;
            data.content = profitAndLoss;
            profitAndLoss.forEach(function (doc) {
                if (doc.journalType == 'income') {
                    totalIncome = doc.total;
                } else {
                    totalExpense = doc.total;
                }
            });
            data.footer = {
                total: numeral(totalIncome - totalExpense).format('0,0.00')
            };
            return data;
        }
    }
});