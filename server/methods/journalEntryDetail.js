// Meteor.methods({
//     journalDetailByDateAndType(date){
//         let journalDetailByDateAndType = Collection.JournalEntry.find(
//             {
//                 date : {"$gte": date}
//
//             }
//         ).fetch();
//         if(journalDetailByDateAndType) {
//             console.log(journalDetailByDateAndType);
//             return journalDetailByDateAndType;
//         }
//     }
// });

Meteor.methods({
    showJournalEntry(limit){
        let showJournalEntry = Collection.JournalEntry.aggregate([
            {
                $unwind: {path: '$journalEntryItem', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "journalItem",
                    localField: "journalEntryItem.journalItemId",
                    foreignField: "_id",
                    as: "journalItemDoc"
                }
            },
            {
                $unwind: {path: '$journalItemDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$typeOfJournal',
                        journalEntryId: '$_id'
                    },
                    date: {
                        $last: "$date"
                    },
                    journalEntryId: {
                        $addToSet: '$_id'
                    },
                    journalType: {
                        $last: "$typeOfJournal"
                    },
                    journalItem: {
                        $addToSet: {
                            journalItemName: '$journalItemDoc.journalItemName',
                            journalItemPrice: '$journalEntryItem.journalItemPrice',
                        }
                    },
                    journalTotalByItem: {
                        $sum: '$journalEntryItem.journalItemPrice'
                    }
                }
            },
            {
                $unwind: {path: '$journalEntryId', preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $project: {
                    date: 1,
                    journalType: 1,
                    journalEntryId: 1,
                    journalItem: 1,
                    journalTotalByItem: 1
                }
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType',
                    },
                    date: {
                        $last: "$date"
                    },
                    journalType: {
                        $last: "$journalType"
                    },
                    journalEntry: {
                        $addToSet: {
                            journalEntryId: '$journalEntryId',
                            journalTotalByItem: '$journalTotalByItem'
                        }
                    }
                }
            },
            {
                $unwind: {path: '$journalEntry', preserveNullAndEmptyArrays: true}
            },
            {
                $project: {
                    date: '$date',
                    journalType: '$journalType',
                    journalEntry: '$journalEntry',
                    journalEntryId: '$journalEntry.journalEntryId',
                    journalTotal: '$journalTotal'
                }
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType',
                    },
                    date: {
                        $last: "$date"
                    },
                    journalType: {
                        $last: "$journalType"
                    },
                    journalEntry: {
                        $addToSet: '$journalEntry'
                    },
                    journalTotal: {
                        $sum: '$journalEntry.journalTotalByItem'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    journalType: 1,
                    journalEntry: 1,
                    journalTotal: 1
                }
            },
            {
                $sort: {
                    date: 1
                }
            },
            {
                $limit: limit
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: '$$ROOT'
                    },
                    count: {$sum: 1}
                }
            }
        ]);
        let data = {};
        let content = [];
        if (showJournalEntry) {
            data.content = showJournalEntry;
            return data;
        }
    },
    journalEntryDetailById(id){
        let journalEntryDetail = Collection.JournalEntry.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $project: {
                    journalEntryItem: 1,
                    _id: 1,
                    typeOfJournal: 1,
                    date: 1
                }
            },
            {
                $group: {
                    _id: {
                        journalEntryId: '$_id'
                    },
                    journalItem: {$last: '$journalEntryItem'},
                    typeOfJournal: {$last: '$typeOfJournal'},
                    date: {$last: '$date'}
                }
            },
            {
                $group: {
                    _id: '$_id.journalEntryId',
                    data: {
                        $addToSet: '$$ROOT'
                    }
                }
            },
            {$unwind: {path: '$data'}},
            {$unwind: {path: '$data.journalItem', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "journalItem",
                    localField: "data.journalItem.journalItemId",
                    foreignField: "_id",
                    as: "data.journalItem.journalItemDoc"
                }
            },
            {
                $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$_id',
                    typeOfJournal: {$last: '$data.typeOfJournal'},
                    date: {$last: '$data.date'},
                    journalEntryItem: {
                        $addToSet: {
                            journalItemName: '$data.journalItem.journalItemDoc.journalItemName',
                            journalItemPrice: '$data.journalItem.journalItemPrice'
                        }
                    },
                    subTotal: {
                        $sum: '$data.journalItem.journalItemPrice'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (journalEntryDetail) {
            data.content = journalEntryDetail;
            return data;
        }
    },
});