//publish journalEntry
Meteor.publish('journalEntrys', function () {
    return Collection.JournalEntry.find();
});
Meteor.publish('journalEntry', function (id) {
    // return Collection.DayExpense.find({_id: _id});
    return Collection.JournalEntry.find({_id: id});
});