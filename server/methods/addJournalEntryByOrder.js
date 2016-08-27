Meteor.methods({
    addJournalEntryByOrder(selector){
        let todayDate = moment().format('YYYYMMDD');
        let prefix = todayDate + '-';
        // selector.orderId = idGenerator.genWithPrefix(Collection.Order, prefix, 4);
        selector._id = idGenerator.genWithPrefix(Collection.JournalEntry, prefix, 4);
        let journalEntry = Collection.JournalEntry.insert(selector);
        if(journalEntry){
            console.log(journalEntry);
            return journalEntry;
        }
    }
});