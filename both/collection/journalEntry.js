Collection.JournalEntry = new Mongo.Collection("journalEntry");
Schema.JournalEntry = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    typeOfJournal: {
        type: String,
        label: "Type of Journal Item",
        autoform: {
            type: "select-radio",
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
        label: "Journal Item Name",
        autoform: {
            type: "select",
            options: function () {
                let typeOfJournal = AutoForm.getFieldValue('typeOfJournal');
                if (typeOfJournal) {
                    let data = Collection.JournalItem.find({typeOfJournal: typeOfJournal});
                    if (data) {
                        console.log(data);
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
        label: "Price ($)",
        decimal: true
    },
    orderId:{
        type:String,
        label:"OrderId",
        optional:true
    }
});
Collection.JournalEntry.attachSchema(Schema.JournalEntry);