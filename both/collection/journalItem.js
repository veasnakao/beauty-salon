Collection.JournalItem = new Mongo.Collection("journalItem");
Schema.JournalItem = new SimpleSchema({
    journalItemName: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    typeOfJournal: {
        type: String,
        label: "Type of Journal Item",
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: "Income", value: 'income'},
                    {label: "Expense", value: 'expense'}
                ];
            }
        }
    }
});
Collection.JournalItem.attachSchema(Schema.JournalItem);

Collection.JournalItem.search = function (query) {
    if (!query) {
        return;
    }
    let regPattern = `${query}`;
    let reg = new RegExp(regPattern, 'i');//match all case
    let selector = {};
    selector.$or = [{
        name: {
            $regex: reg
        }
    }];

    return Collection.JournalItem.find(selector, {
        sort: {
            name: 1
        }
    });
};