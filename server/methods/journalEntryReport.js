Meteor.methods({
    // journalEntryReport(fromDate, toDate, typeOfJournal){
    //     fromDate = moment(fromDate).toDate();
    //     toDate = moment(toDate).toDate();
    //     let journalEntry = Collection.JournalEntry.aggregate([
    //         {
    //             $match: {
    //                 typeOfJournal: typeOfJournal,
    //                 date: {
    //                     $gte: fromDate, $lte: toDate
    //                 }
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: "order",
    //                 localField: "orderId",
    //                 foreignField: "_id",
    //                 as: "orderDoc"
    //             }
    //         }, {
    //             $unwind: {path: '$orderDoc', preserveNullAndEmptyArrays: true}
    //         },
    //         {
    //             $lookup: {
    //                 from: "orderDetail",
    //                 localField: "orderDoc._id",
    //                 foreignField: "orderId",
    //                 as: "orderDetailDoc"
    //             }
    //         },
    //         {$unwind: {path: '$orderDetailDoc', preserveNullAndEmptyArrays: true}},
    //         {
    //             $lookup: {
    //                 from: "item",
    //                 localField: "orderDetailDoc.itemId",
    //                 foreignField: "_id",
    //                 as: "orderDetailDoc.itemDoc"
    //             }
    //         },
    //         {$unwind: {path: '$orderDetailDoc.itemDoc', preserveNullAndEmptyArrays: true}},
    //         {
    //             $project: {
    //                 journalEntryItem: 1,
    //                 _id: 1,
    //                 orderDoc: {$ifNull: ["$orderDoc", []]},
    //                 orderDetailDoc: 1,
    //                 typeOfJournal: 1,
    //                 date: 1
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: {
    //                     journalEntryId: '$_id',
    //                     orderDocId: '$orderDoc._id'
    //                 },
    //                 journalItem: {$last: '$journalEntryItem'},
    //                 typeOfJournal: {$last: '$typeOfJournal'},
    //                 date: {$last: '$date'},
    //                 orderDoc: {$last: '$orderDoc'},
    //                 orderDetail: {
    //                     $addToSet: {
    //                         itemName: '$orderDetailDoc.itemDoc.name',
    //                         price: '$orderDetailDoc.price',
    //                         qty: '$orderDetailDoc.quantity',
    //                         amount: '$orderDetailDoc.amount'
    //                     }
    //                 }
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
    //         }, {
    //             $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
    //         },
    //         {
    //             $group: {
    //                 _id: '$_id',
    //                 typeOfJournal: {$last: '$data.typeOfJournal'},
    //                 date: {$last: '$data.date'},
    //                 orderDetailDoc: {
    //                     $last: '$data.orderDetail'
    //                 },
    //                 orderDoc: {
    //                     $last: '$data.orderDoc'
    //                 },
    //                 journalEntryItem: {
    //                     $addToSet: '$data.journalItem'
    //                 },
    //                 totalJournalItem: {
    //                     $sum: '$data.journalItem.journalItemPrice'
    //                 }
    //             }
    //         }
    //     ]);
    //     let data = {};
    //     let content = [];
    //     if (journalEntry) {
    //         data.content = journalEntry;
    //         console.log(data.content);
    //         return data;
    //     }
    // },
    journalEntryIncomeFromOrder(fromDate,toDate){
        // let journalEntry = Collection.JournalEntry.aggregate([
        //     {
        //         $match: {
        //             typeOfJournal: 'income'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "order",
        //             localField: "orderId",
        //             foreignField: "_id",
        //             as: "orderDoc"
        //         }
        //     }, {
        //         $unwind: {path: '$orderDoc', preserveNullAndEmptyArrays: true}
        //     },
        //     {
        //         $lookup: {
        //             from: "orderDetail",
        //             localField: "orderDoc._id",
        //             foreignField: "orderId",
        //             as: "orderDetailDoc"
        //         }
        //     },
        //     {$unwind: {path: '$orderDetailDoc', preserveNullAndEmptyArrays: true}},
        //     {
        //         $lookup: {
        //             from: "item",
        //             localField: "orderDetailDoc.itemId",
        //             foreignField: "_id",
        //             as: "orderDetailDoc.itemDoc"
        //         }
        //     },
        //     {$unwind: {path: '$orderDetailDoc.itemDoc', preserveNullAndEmptyArrays: true}},
        //     {
        //         $project: {
        //             journalEntryItem: 1,
        //             _id: 1,
        //             orderDoc: {$ifNull: ["$orderDoc", []]},
        //             orderDetailDoc: 1,
        //             typeOfJournal: 1,
        //             date: 1
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: {
        //                 journalEntryId: '$_id',
        //                 orderDocId: '$orderDoc._id'
        //             },
        //             journalItem: {$last: '$journalEntryItem'},
        //             typeOfJournal: {$last: '$typeOfJournal'},
        //             date: {$last: '$date'},
        //             orderDoc: {$last: '$orderDoc'},
        //             orderDetail: {
        //                 $addToSet: {
        //                     itemName: '$orderDetailDoc.itemDoc.name',
        //                     price: '$orderDetailDoc.price',
        //                     qty: '$orderDetailDoc.quantity',
        //                     amount: '$orderDetailDoc.amount'
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: '$_id.journalEntryId',
        //             data: {
        //                 $addToSet: '$$ROOT'
        //             }
        //         }
        //     },
        //     {$unwind: {path: '$data'}},
        //     {$unwind: {path: '$data.journalItem', preserveNullAndEmptyArrays: true}},
        //     {
        //         $lookup: {
        //             from: "journalItem",
        //             localField: "data.journalItem.journalItemId",
        //             foreignField: "_id",
        //             as: "data.journalItem.journalItemDoc"
        //         }
        //     }, {
        //         $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
        //     },
        //     {
        //         $group: {
        //             _id: '$_id',
        //             typeOfJournal: {$last: '$data.typeOfJournal'},
        //             date: {$last: '$data.date'},
        //             orderDetailDoc: {
        //                 $last: '$data.orderDetail'
        //             },
        //             orderDoc: {
        //                 $last: '$data.orderDoc'
        //             },
        //             journalEntryItem: {
        //                 $addToSet: '$data.journalItem',
        //             },
        //             totalJournalItem: {
        //                 $sum: '$data.journalItem.journalItemPrice'
        //             }
        //         }
        //     }
        // ]);
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
        let journalEntryIncome = Collection.JournalEntry.aggregate([
            {
                $match: {
                    typeOfJournal: 'income',
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
                }
            },
            {
                $lookup: {
                    from: "order",
                    localField: "orderId",
                    foreignField: "_id",
                    as: "orderDoc"
                }
            }, {
                $unwind: {path: '$orderDoc', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "orderDetail",
                    localField: "orderDoc._id",
                    foreignField: "orderId",
                    as: "orderDetailDoc"
                }
            },
            {$unwind: {path: '$orderDetailDoc', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "item",
                    localField: "orderDetailDoc.itemId",
                    foreignField: "_id",
                    as: "orderDetailDoc.itemDoc"
                }
            },
            {
                $lookup: {
                    from: "staff",
                    localField: "orderDoc.staffId",
                    foreignField: "_id",
                    as: "orderDoc.staffDoc"
                }
            },
            {
                $lookup: {
                    from: "customer",
                    localField: "orderDoc.customerId",
                    foreignField: "_id",
                    as: "orderDoc.customerDoc"
                }
            },
            {$unwind: {path: '$orderDetailDoc.itemDoc', preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    // journalEntryItem: 1,
                    _id: 1,
                    orderDoc: {$ifNull: ["$orderDoc", []]},
                    orderDetailDoc: 1,
                    typeOfJournal: 1,
                    date: 1
                }
            },
            {
                $group: {
                    _id: {
                        journalEntryId: '$_id',
                        orderDocId: '$orderDoc._id'
                    },
                    // journalItem: {$last: '$journalEntryItem'},
                    typeOfJournal: {$last: '$typeOfJournal'},
                    date: {$last: '$date'},
                    orderDoc: {$last: '$orderDoc'},
                    orderDetail: {
                        $addToSet: {
                            itemName: '$orderDetailDoc.itemDoc.name',
                            price: '$orderDetailDoc.price',
                            qty: '$orderDetailDoc.quantity',
                            discount: '$orderDetailDoc.discount',
                            amount: '$orderDetailDoc.amount'
                        }
                    }
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

            {
                $group: {
                    _id: '$_id',
                    typeOfJournal: {$last: '$data.typeOfJournal'},
                    date: {$last: '$data.date'},
                    orderDetailDoc: {
                        $last: '$data.orderDetail'
                    },
                    orderDoc: {
                        $last: '$data.orderDoc'
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: '$$ROOT'
                    },
                    total: {
                        $sum: '$orderDoc.total'
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (journalEntryIncome) {
            data.content = journalEntryIncome;
            console.log(`journalEntryFromOrder ${data}`);
            return data;
        }
    },
    allJournalEntry(){
        let allJournalEntry = Collection.JournalEntry.aggregate([
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
                        $addToSet: '$data.journalItem'
                    },
                    subTotal: {
                        $sum: '$data.journalItem.journalItemPrice'
                    }
                }
            },
            {
                $sort: {_id: -1}
            }
        ]);
        let data = {};
        let content = [];
        if (allJournalEntry) {
            data.content = allJournalEntry;
            console.log(typeof data.content);
            console.log(data.content);
            return data;
        }
    },
    journalEntryByJournalType(fromDate,toDate,typeOfJournal){
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
        let journalEntry = Collection.JournalEntry.aggregate([
            {
                $match: {
                    typeOfJournal: typeOfJournal,
                    date: {
                        $gte: fromDate, $lte: toDate
                    }
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
                        $addToSet: '$data.journalItem',
                    },
                    subTotal: {
                        $sum: '$data.journalItem.journalItemPrice'
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $addToSet: '$$ROOT'
                    },
                    total: {
                        $sum: '$subTotal'
                    }
                }
            },
            {
                $sort: {_id: -1}
            }
            // {
            //     $lookup: {
            //         from: "order",
            //         localField: "orderId",
            //         foreignField: "_id",
            //         as: "orderDoc"
            //     }
            // }, {
            //     $unwind: {path: '$orderDoc', preserveNullAndEmptyArrays: true}
            // },
            // {
            //     $lookup: {
            //         from: "orderDetail",
            //         localField: "orderDoc._id",
            //         foreignField: "orderId",
            //         as: "orderDetailDoc"
            //     }
            // },
            // {$unwind: {path: '$orderDetailDoc', preserveNullAndEmptyArrays: true}},
            // {
            //     $lookup: {
            //         from: "item",
            //         localField: "orderDetailDoc.itemId",
            //         foreignField: "_id",
            //         as: "orderDetailDoc.itemDoc"
            //     }
            // },
            // {$unwind: {path: '$orderDetailDoc.itemDoc', preserveNullAndEmptyArrays: true}},
            // {
            //     $project: {
            //         journalEntryItem: 1,
            //         _id: 1,
            //         orderDoc: {$ifNull: ["$orderDoc", []]},
            //         orderDetailDoc: 1,
            //         typeOfJournal: 1,
            //         date: 1
            //     }
            // },
            // {
            //     $group: {
            //         _id: {
            //             journalEntryId: '$_id',
            //             orderDocId: '$orderDoc._id'
            //         },
            //         journalItem: {$last: '$journalEntryItem'},
            //         typeOfJournal: {$last: '$typeOfJournal'},
            //         date: {$last: '$date'},
            //         orderDoc: {$last: '$orderDoc'},
            //         orderDetail: {
            //             $addToSet: {
            //                 itemName: '$orderDetailDoc.itemDoc.name',
            //                 price: '$orderDetailDoc.price',
            //                 qty: '$orderDetailDoc.quantity',
            //                 amount: '$orderDetailDoc.amount'
            //             }
            //         }
            //     }
            // },
            // {
            //     $group: {
            //         _id: '$_id.journalEntryId',
            //         data: {
            //             $addToSet: '$$ROOT'
            //         }
            //     }
            // },
            // {$unwind: {path: '$data'}},
            // {$unwind: {path: '$data.journalItem', preserveNullAndEmptyArrays: true}},
            // {
            //     $lookup: {
            //         from: "journalItem",
            //         localField: "data.journalItem.journalItemId",
            //         foreignField: "_id",
            //         as: "data.journalItem.journalItemDoc"
            //     }
            // }, {
            //     $unwind: {path: '$data.journalItem.journalItemDoc', preserveNullAndEmptyArrays: true}
            // },
            // {
            //     $group: {
            //         _id: '$_id',
            //         typeOfJournal: {$last: '$data.typeOfJournal'},
            //         date: {$last: '$data.date'},
            //         orderDetailDoc: {
            //             $last: '$data.orderDetail'
            //         },
            //         orderDoc: {
            //             $last: '$data.orderDoc'
            //         },
            //         journalEntryItem: {
            //             $addToSet: '$data.journalItem',
            //         },
            //         totalJournalItem: {
            //             $sum: '$data.journalItem.journalItemPrice'
            //         }
            //     }
            // }
        ]);
        let data = {};
        let content = [];
        if (journalEntry) {
            data.content = journalEntry;
            console.log(data.content);
            return data;
        }
    }
});