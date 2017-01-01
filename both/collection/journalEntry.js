Collection.JournalEntry = new Mongo.Collection("journalEntry");
Schema.JournalEntry = new SimpleSchema({
    date: {
        type: Date,
        label: "Date",
        autoform: {
            placeholder: "date"
        }
    },
    typeOfJournal: {
        type: String,
        label: "Type",
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: "Income", value: 'income'},
                    {label: "Expense", value: 'expense'}
                ];
            }
        }
    },
    journalEntryItem: {
        type: [Object],
        custom() {
            if (!this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
                return "required";
            }
        }
    },
    'journalEntryItem.$.journalItemId': {
        type: String,
        label: "Name",
        autoform: {
            type: "select",
            options: function () {
                let typeOfJournal = AutoForm.getFieldValue('typeOfJournal');
                if (typeOfJournal) {
                    let data = Collection.JournalItem.find({typeOfJournal: typeOfJournal});
                    if (data) {
                        let list = [];
                        data.forEach(function (obj) {
                            list.push({label: obj.journalItemName, value: obj._id});
                        });
                        return list;
                    }
                }
            }
        }
    },
    'journalEntryItem.$.journalItemPrice': {
        type: Number,
        label: "Amount ($)",
        decimal: true,
        autoform: {
            placeholder: "amount"
        }
    },
    orderId:{
        type:String,
        label:"OrderId",
        optional:true
    }
});
Collection.JournalEntry.attachSchema(Schema.JournalEntry);