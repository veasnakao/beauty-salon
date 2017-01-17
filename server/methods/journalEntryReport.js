Meteor.methods({
    journalEntry(){
        let journalEntry = Collection.JournalEntry.aggregate([
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
                        journalItemId: '$journalEntryItem.journalItemId',
                        journaType: '$typeOfJournal'
                    },
                    date: {
                        $last: "$date"
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
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType'
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
                    }
                }
            },
            {
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType'
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
                            journalTotalByItem: '$journalItem.journalTotalByItem'
                        }
                    },
                    journalTotal: {
                        $sum: '$journalItem.journalTotalByItem'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: '$date',
                    journalType: '$journalType',
                    journalItem: '$journalItem',
                    journalTotal: '$journalTotal'

                }
            }
        ]);
        let data = {};
        let content = [];
        if (journalEntry) {
            data.content = journalEntry;
            return data;
        }
    },
    journalEntryDetail(date, journalType){
        date = moment(date).endOf('days').toDate();
        let startDate = moment(date).startOf('days').toDate();
        let endDate = moment(date).endOf('days').toDate();
        let journalEntryDetail = Collection.JournalEntry.aggregate([
            {
                $match: {
                    date: {$gte: startDate, $lte: endDate},
                    typeOfJournal: journalType
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
                        journalItemId: '$journalEntryItem.journalItemId',
                        journaType: '$typeOfJournal'
                    },
                    date: {
                        $last: "$date"
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
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType'
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
                    }
                }
            },
            {
                $unwind: {path: '$journalItem', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        month: {$month: "$date"},
                        day: {$dayOfMonth: "$date"},
                        year: {$year: "$date"},
                        journaType: '$journalType'
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
                            journalTotalByItem: '$journalItem.journalTotalByItem'
                        }
                    },
                    journalTotal: {
                        $sum: '$journalItem.journalTotalByItem'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    journalType: 1,
                    journalItem: 1,
                    journalTotal: 1

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
    // allJournalEntry(){
    //     let allJournalEntry = Collection.JournalEntry.aggregate([
    //         {
    //             $project: {
    //                 journalEntryItem: 1,
    //                 _id: 1,
    //                 typeOfJournal: 1,
    //                 date: 1
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: {
    //                     journalEntryId: '$_id'
    //                 },
    //                 journalItem: {$last: '$journalEntryItem'},
    //                 typeOfJournal: {$last: '$typeOfJournal'},
    //                 date: {$last: '$date'}
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: '$_id.journalEntryId',
    //                 data: {
    //                     $addToSet: '$$ROOT'
    //                 }
    //             }
    //         },
    //         {$unwind: {path: '$data'}},
    //         {$unwind: {path: '$data.journalItem', preserveNullAndEmptyArrays: true}},
    //         {
    //             $lookup: {
    //                 from: "journalItem",
    //                 localField: "data.journalItem.journalItemId",
    //                 foreignField: "_id",
    //                 as: "data.journalItem.journalItemDoc"
    //             }
    //         },
    //         {
    //             $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
    //         },
    //         {
    //             $group: {
    //                 _id: '$_id',
    //                 typeOfJournal: {$last: '$data.typeOfJournal'},
    //                 date: {$last: '$data.date'},
    //                 journalEntryItem: {
    //                     $addToSet: '$data.journalItem'
    //                 },
    //                 subTotal: {
    //                     $sum: '$data.journalItem.journalItemPrice'
    //                 }
    //             }
    //         },
    //         {
    //             $sort: {_id: -1}
    //         }
    //     ]);
    //     let data = {};
    //     let content = [];
    //     if (allJournalEntry) {
    //         data.content = allJournalEntry;
    //         return data;
    //     }
    // },

    journalEntryReport(fromDate, toDate){
        // fromDate = moment(fromDate).startOf('days').toDate();
        // toDate = moment(toDate).endOf('days').toDate();
        let journalEntry = Collection.JournalEntry.aggregate([
            {
                $match: {
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $unwind: { path: '$journalEntryItem', preserveNullAndEmptyArrays: true }
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
                $unwind: { path: '$journalItemDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$_id',
                    typeOfJournal: {
                        $last: "$typeOfJournal"
                    },
                    date:{
                        $last:'$date'
                    },
                    journalItemDoc: {
                        $addToSet: {
                            itemName: '$journalItemDoc.journalItemName',
                            amount: '$journalEntryItem.journalItemPrice'
                        }
                    },
                    total:{
                        $sum: '$journalEntryItem.journalItemPrice'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (journalEntry) {
            console.log(journalEntry);
            data.content = journalEntry;
            return data;
        }
    },

    // allJournalEntry(){
    //     let allJournalEntry = Collection.JournalEntry.aggregate([
    //         {
    //             $project: {
    //                 journalEntryItem: 1,
    //                 _id: 1,
    //                 typeOfJournal: 1,
    //                 date: 1
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: {
    //                     journalEntryId: '$_id'
    //                 },
    //                 journalItem: {$last: '$journalEntryItem'},
    //                 typeOfJournal: {$last: '$typeOfJournal'},
    //                 date: {$last: '$date'}
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: '$_id.journalEntryId',
    //                 data: {
    //                     $addToSet: '$$ROOT'
    //                 }
    //             }
    //         },
    //         {$unwind: {path: '$data'}},
    //         {$unwind: {path: '$data.journalItem', preserveNullAndEmptyArrays: true}},
    //         {
    //             $lookup: {
    //                 from: "journalItem",
    //                 localField: "data.journalItem.journalItemId",
    //                 foreignField: "_id",
    //                 as: "data.journalItem.journalItemDoc"
    //             }
    //         },
    //         {
    //             $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
    //         },
    //         {
    //             $group: {
    //                 _id: '$_id',
    //                 typeOfJournal: {$last: '$data.typeOfJournal'},
    //                 date: {$last: '$data.date'},
    //                 journalEntryItem: {
    //                     $addToSet: '$data.journalItem'
    //                 },
    //                 subTotal: {
    //                     $sum: '$data.journalItem.journalItemPrice'
    //                 }
    //             }
    //         },
    //         {
    //             $sort: {_id: -1}
    //         }
    //     ]);
    //     let data = {};
    //     let content = [];
    //     if (allJournalEntry) {
    //         data.content = allJournalEntry;
    //         return data;
    //     }
    // },
});