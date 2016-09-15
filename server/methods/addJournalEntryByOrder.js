Meteor.methods({
    addJournalEntryByOrder(selector){
        let date = selector.date;
        let todayDate = moment(date).format('YYYYMMDD');
        let prefix = todayDate + '-';
        selector._id = idGenerator.genWithPrefix(Collection.JournalEntry, prefix, 4);
        let journalEntry = Collection.JournalEntry.insert(selector);
        if (journalEntry) {
            return journalEntry;
        }
    }
});