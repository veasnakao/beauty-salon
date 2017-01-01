//publish journalItem
Meteor.publish('journalItems', function () {
    return Collection.JournalItem.find();
});
Meteor.publish('journalItem', function (_id) {
    return Collection.JournalItem.find({_id: _id});
});