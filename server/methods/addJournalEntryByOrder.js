Meteor.methods({
    addJournalEntryByOrder(selector){
        var todayDate = moment().format('YYYYMMDD');
        var prefix = todayDate + '-';
        selector._id = idGenerator.genWithPrefix(Collection.Order, prefix, 4);
        let orderId = Collection.JournalEntry.insert(selector);
        return orderId;
    }
});